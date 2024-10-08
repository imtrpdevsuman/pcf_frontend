//  import { getAllTypeOfControls } from "@/actions/typeOfControl";
// import ApplyFilterButton from "@/components/v2/ApplyFilterButton";
// import { useHeaderData } from "@/hooks/useHeaderData";
// import { useSelectedItem } from "@/hooks/useSelectedItem";
// import type { getAllControlsType, getHeaderTypes } from "@/types";
// import { useQuery } from "@tanstack/react-query";
// import {
//     ComboBox,
//     ComboBoxDomRef,
//     ComboBoxItem,
//     FilterBar,
//     FilterGroupItem,
//     Title,
//     Ui5CustomEvent,
// } from "@ui5/webcomponents-react";
// import { ComboBoxSelectionChangeEventDetail } from "@ui5/webcomponents/dist/ComboBox.js";
// import { useEffect, useState } from "react";

// interface FilterBarComponentProps {
//     setFilterData: (data: any) => void; 
// }

// const FilterBarComponent: React.FC<FilterBarComponentProps> = ({ setFilterData}) => {
//     const [selectedSync, setSelectedSync] = useState<string>("");
//     const [selectedTypeOfControls, setSelectedTypeOfControls] = useState<string>("");
//     const { data, error, isLoading } = useHeaderData();
//     const { setSelectedItem } = useSelectedItem();

//     const [allFilterValues, setAllFilterValues] = useState({
//         syncId: 1,
//         typeOfControlsId: 1,
//     });

//     const {
//         data: allTypeOfControlsDataRes,
//         isFetching: allTypeOfControlsDataResFetching,
//         isError: allTypeOfControlsDataResError,
//     } = useQuery({
//         queryKey: ["allControlsData"],
//         queryFn: getAllTypeOfControls,
//         retry: 3,
//     });

//     // useEffect(() => {
//     //     if (data && data.length > 0) {
//     //         const lastItem = data[data.length - 1];
//     //         setSelectedSync(lastItem.SYNC_ID);
//     //         setSelectedItem(lastItem);
//     //         setAllFilterValues((prevValues) => ({
//     //             ...prevValues,
//     //             syncId: lastItem.ID, // Ensure this is the correct field for syncId
//     //         }));
//     //     }

//     useEffect(() => {
//         if (data && data.length > 0) {
//             setSelectedSync(data[0].SYNC_ID);
//             setSelectedItem(data[0]);
//             setAllFilterValues((prevValues) => ({
//                 ...prevValues,
//                 syncId: data[0].ID,
//             }));
//         }

//         if (
//             allTypeOfControlsDataRes &&
//             allTypeOfControlsDataRes.data.length > 0
//         ) {
//             setSelectedTypeOfControls(
//                 allTypeOfControlsDataRes.data[0].CONTROL_NAME
//             );
//         }
//     }, [data, allTypeOfControlsDataRes]);

//     const handleSyncComboBoxChange = (
//         event: Ui5CustomEvent<
//             ComboBoxDomRef,
//             ComboBoxSelectionChangeEventDetail
//         >
//     ) => {
//         const selectedItemId = Number(
//             event.detail?.item?.getAttribute("data-sync-id")
//         );
//         const selectedItem =
//             data?.find((item) => item.ID === selectedItemId) || null;
//         setSelectedItem(selectedItem);
//         const selectedSync = selectedItem?.SYNC_ID || "";
//         setSelectedSync(selectedSync);
//         setAllFilterValues({
//             ...allFilterValues,
//             syncId: selectedItemId || 0,
//         });
//     };

//     const handleTypeOfControlsComboBoxChange = (
//         event: Ui5CustomEvent<
//             ComboBoxDomRef,
//             ComboBoxSelectionChangeEventDetail
//         >
//     ) => {
//         const selectedItemId = Number(
//             event.detail?.item?.getAttribute("data-typeofcontrols-id")
//         );
//         const selectedTypeOfControl =
//             allTypeOfControlsDataRes?.data?.find(
//                 (item) => item.ID === selectedItemId
//             ) || null;
//         if (selectedTypeOfControl) {
//             setSelectedTypeOfControls(selectedTypeOfControl.CONTROL_NAME);
//         }
//         setAllFilterValues({
//             ...allFilterValues,
//             typeOfControlsId: selectedTypeOfControl?.ID || 0,
//         });
//     };

//     return (
//         <FilterBar
//             filterContainerWidth="13.125rem"
//             header={<Title>Filters</Title>}
//             filterBarCollapsed
//         >
//             {!allTypeOfControlsDataResError &&
//                 allTypeOfControlsDataRes &&
//                 allTypeOfControlsDataRes.data.length > 0 && (
//                     <FilterGroupItem label="Type Of Controls">
//                         <ComboBox
//                             valueState="None"
//                             value={selectedTypeOfControls}
//                             onSelectionChange={handleTypeOfControlsComboBoxChange}
//                             loading={allTypeOfControlsDataResFetching}
//                         >
//                             {allTypeOfControlsDataRes.data.map((head: getAllControlsType) => (
//                                 <ComboBoxItem
//                                     key={head.ID}
//                                     text={head.CONTROL_NAME}
//                                     data-typeofcontrols-id={head.ID}
//                                 />
//                             ))}
//                         </ComboBox>
//                     </FilterGroupItem>
//                 )}

//             {!error && data && data.length > 0 && (
//                 <FilterGroupItem label="SYNC">
//                     <ComboBox
//                         value={selectedSync}
//                         valueState="None"
//                         onSelectionChange={handleSyncComboBoxChange}
//                         loading={isLoading}
//                     >
//                         {data?.map((head: getHeaderTypes) => (
//                             <ComboBoxItem
//                                 key={head.SYNC_ID}
//                                 text={head.SYNC_ID}
//                                 data-sync-id={head.ID}
//                             />
//                         ))}
//                     </ComboBox>
//                 </FilterGroupItem>
//             )}

//             <ApplyFilterButton
//                 value={allFilterValues}
//                 setFilterData={setFilterData} 
//                 resetFilters={undefined}       
//              />
//         </FilterBar>
//     );
// };

// export default FilterBarComponent;




import { getAllTypeOfControls } from "@/actions/typeOfControl";
import ApplyFilterButton from "@/components/v2/ApplyFilterButton";
import { useHeaderData } from "@/hooks/useHeaderData";
import { useSelectedItem } from "@/hooks/useSelectedItem";
import type { getAllControlsType, getHeaderTypes } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
    ComboBox,
    ComboBoxDomRef,
    ComboBoxItem,
    FilterBar,
    FilterGroupItem,
    Title,
    Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import { ComboBoxSelectionChangeEventDetail } from "@ui5/webcomponents/dist/ComboBox.js";
import { useEffect, useRef, useState } from "react";

interface FilterBarComponentProps {
    setFilterData: (data: any) => void;
}

const FilterBarComponent: React.FC<FilterBarComponentProps> = ({ setFilterData }) => {
    const [selectedSync, setSelectedSync] = useState<string>("");
    const [selectedTypeOfControls, setSelectedTypeOfControls] = useState<string>("");

    const { data, error, isLoading } = useHeaderData();
    const { setSelectedItem } = useSelectedItem();

    // Add a ref to store initial filter values
    const initialFilterValuesRef = useRef({
        syncId: 1,
        typeOfControlsId: 1,
    });

    const [allFilterValues, setAllFilterValues] = useState(initialFilterValuesRef.current);

    const {
        data: allTypeOfControlsDataRes,
        isFetching: allTypeOfControlsDataResFetching,
        isError: allTypeOfControlsDataResError,
    } = useQuery({
        queryKey: ["allControlsData"],
        queryFn: getAllTypeOfControls,
        retry: 3,
    });

    useEffect(() => {
        if (data && data.length > 0) {
            setSelectedSync(data[0].SYNC_ID);
            setSelectedItem(data[0] || null);
            setAllFilterValues((prevValues) => ({
                ...prevValues,
                syncId: data[0].ID,
            }));
        }

        if (
            allTypeOfControlsDataRes &&
            allTypeOfControlsDataRes.data.length > 0
        ) {
            setSelectedTypeOfControls(
                allTypeOfControlsDataRes.data[0].CONTROL_NAME
            );
        }
    }, [data, allTypeOfControlsDataRes]);

    const handleSyncComboBoxChange = (
        event: Ui5CustomEvent<
            ComboBoxDomRef,
            ComboBoxSelectionChangeEventDetail
        >
    ) => {
        const selectedItemId = Number(
            event.detail?.item?.getAttribute("data-sync-id")
        );
        const selectedItem =
            data?.find((item) => item.ID === selectedItemId) || null;
        setSelectedItem(selectedItem || null);
        const selectedSync = selectedItem?.SYNC_ID || "";
        setSelectedSync(selectedSync);
        setAllFilterValues({
            ...allFilterValues,
            syncId: selectedItemId || 0,
        });
    };

    const handleTypeOfControlsComboBoxChange = (
        event: Ui5CustomEvent<
            ComboBoxDomRef,
            ComboBoxSelectionChangeEventDetail
        >
    ) => {
        const selectedItemId = Number(
            event.detail?.item?.getAttribute("data-typeofcontrols-id")
        );
        const selectedTypeOfControl =
            allTypeOfControlsDataRes?.data?.find(
                (item) => item.ID === selectedItemId
            ) || null;
        if (selectedTypeOfControl) {
            setSelectedTypeOfControls(selectedTypeOfControl.CONTROL_NAME);
        }
        setAllFilterValues({
            ...allFilterValues,
            typeOfControlsId: selectedTypeOfControl?.ID || 0,
        });
    };

    // Reset Filters to Initial Values
    const resetFilters = () => {
        setAllFilterValues(initialFilterValuesRef.current); // Reset to initial values
        setSelectedSync(data?.[0]?.SYNC_ID || ""); // Reset ComboBox values
        setSelectedTypeOfControls(allTypeOfControlsDataRes?.data?.[0]?.CONTROL_NAME || "");
        setSelectedItem(data?.[0] || null);
    };
    

    return (
        <FilterBar
            filterContainerWidth="13.125rem"
            header={<Title>Filters</Title>}
            filterBarCollapsed
        >
            {!allTypeOfControlsDataResError &&
                allTypeOfControlsDataRes &&
                allTypeOfControlsDataRes.data.length > 0 && (
                    <FilterGroupItem label="Type Of Controls">
                        <ComboBox
                            valueState="None"
                            value={selectedTypeOfControls}
                            onSelectionChange={handleTypeOfControlsComboBoxChange}
                            loading={allTypeOfControlsDataResFetching}
                        >
                            {allTypeOfControlsDataRes.data.map((head: getAllControlsType) => (
                                <ComboBoxItem
                                    key={head.ID}
                                    text={head.CONTROL_NAME}
                                    data-typeofcontrols-id={head.ID}
                                />
                            ))}
                        </ComboBox>
                    </FilterGroupItem>
                )}

            {!error && data && data.length > 0 && (
                <FilterGroupItem label="SYNC">
                    <ComboBox
                        value={selectedSync}
                        valueState="None"
                        onSelectionChange={handleSyncComboBoxChange}
                        loading={isLoading}
                    >
                        {data?.map((head: getHeaderTypes) => (
                            <ComboBoxItem
                                key={head.SYNC_ID}
                                text={head.SYNC_ID}
                                data-sync-id={head.ID}
                            />
                        ))}
                    </ComboBox>
                </FilterGroupItem>
            )}

            <ApplyFilterButton
                value={allFilterValues}
                setFilterData={setFilterData}
                resetFilters={resetFilters} // Pass resetFilters
            />
        </FilterBar>
    );
};

export default FilterBarComponent;
