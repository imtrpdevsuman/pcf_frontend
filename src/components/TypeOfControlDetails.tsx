import { useState } from "react";
import {
    List,
    StandardListItem,
    Toolbar,
    Title,
    ToolbarSpacer,
    Button,
    Avatar,
    FlexBox,
    Label,
    Text,
    ToolbarDesign,
    AvatarSize,
    FCLLayout,
    FlexibleColumnLayout,
    ButtonDesign,
    FlexBoxDirection,
    Card,
    Modals,
    MessageBoxTypes,
    MessageBoxActions,
} from "@ui5/webcomponents-react";
import { getAllControlsType } from "../utils/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "./Loading";
import axios from "axios";
import toast from "react-hot-toast";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import ErrorComponent from "./ErrorComponent";
import NoDataComponent from "./NoDataComponent";
import ControlEditForm from "./ControlEditForm";

const TypeOfControlDetails = () => {
    const [layout, setLayout] = useState<FCLLayout>(FCLLayout.OneColumn);
    const [isEdit, setIsEdit] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedControl, setSelectedControl] = useState<
        getAllControlsType | undefined
    >(undefined);
    const [error, setError] = useState(false);
    const showDeleteConfirmation = Modals.useShowMessageBox();
    const queryClient = useQueryClient();

    const fetchData = async () => {
        try {
            const endPointAllControls = `${import.meta.env.VITE_BACKEND_BASE_URL}/control-master/get-all-controls`;
            const response = await axios.get(endPointAllControls);
            if (response.data.statuscode !== 200) {
                setError(true);
            }
            setError(false);
            return response.data;
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    const { data, isFetching, isError } = useQuery({
        queryKey: ["allControlsData"],
        queryFn: fetchData,
        retry: 3,
    });

    const deleteControlData = async (id: number) => {
        const endPoint = `${import.meta.env.VITE_BACKEND_BASE_URL}/control-master/delete-control`;
        try {
            const data = {
                id,
                customer_id: 1,
            };
            const response = await axios.patch(endPoint, data);
            if (response.data?.statuscode !== 200) {
                setError(true);
                throw response.data?.message;
            }

            return response.data;
        } catch (error) {
            console.error(error);
            setError(true);
            throw error;
        }
    };

    const handleDeleteControls = async (id: number) => {
        await toast.promise(deleteControlData(id), {
            loading: "Deleting Control...",
            success: "Control deleted successfully!",
            error: (error) => `Failed to delete control: ${error.message}`,
        });
        await queryClient.invalidateQueries({ queryKey: ["allControlsData"] });
        setIsEdit(false);
        setIsFullScreen(false);
        setLayout(FCLLayout.OneColumn);
    };

    const controlDataRes = data;

    const allControlsData: getAllControlsType[] = controlDataRes?.data;

    if (isError || error) {
        return <ErrorComponent />;
    }

    if (isFetching) {
        return <Loading />;
    }

    if (!isFetching && allControlsData === undefined) {
        return <ErrorComponent />;
    }

    if (!isFetching && data?.statuscode === 500) {
        return <ErrorComponent />;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onStartColumnClick = (e: any) => {
        const controlId = parseInt(e.detail.item.dataset.controlId);
        const control = allControlsData.find((control) => Number(control.ID) === controlId);
        setSelectedControl(control);
        console.log(control);
        setLayout(FCLLayout.TwoColumnsMidExpanded);
    };

    return (
        <>
            {!isFetching && allControlsData.length === 0 ? (
                <NoDataComponent />
            ) : (
                <FlexibleColumnLayout
                    style={{
                        height: "100%",
                        marginTop: "0.5rem",
                        marginBottom: "0.5rem",
                        borderRadius:
                            ThemingParameters.sapButton_BorderCornerRadius,
                    }}
                    layout={layout}
                    startColumn={
                        <List onItemClick={onStartColumnClick}>
                            {allControlsData?.map((control, index) => (
                                <StandardListItem
                                    description={control.CONTROL_DESC}
                                    data-control-id={control.ID}
                                    key={`${control.ID}-${index}`}
                                >
                                    {control.CONTROL_NAME}
                                </StandardListItem>
                            ))}
                        </List>
                    }
                    midColumn={
                        <>
                            <Toolbar design={ToolbarDesign.Solid}>
                                <Title>{selectedControl?.CONTROL_NAME}</Title>
                                <ToolbarSpacer />
                                {isFullScreen ? (
                                    <Button
                                        icon="exit-full-screen"
                                        design={ButtonDesign.Transparent}
                                        onClick={() => {
                                            setIsFullScreen(!isFullScreen);
                                            setLayout(
                                                FCLLayout.TwoColumnsStartExpanded
                                            );
                                        }}
                                    />
                                ) : (
                                    <Button
                                        icon="full-screen"
                                        design={ButtonDesign.Transparent}
                                        onClick={() => {
                                            setIsFullScreen(!isFullScreen);
                                            setLayout(
                                                FCLLayout.MidColumnFullScreen
                                            );
                                        }}
                                    />
                                )}
                                <Button
                                    icon="delete"
                                    design={ButtonDesign.Transparent}
                                    onClick={() => {
                                        showDeleteConfirmation({
                                            onClose(event) {
                                                if (
                                                    event.detail.action ===
                                                    "Delete"
                                                ) {
                                                    handleDeleteControls(
                                                        selectedControl?.ID ?? 0
                                                    );
                                                }
                                            },
                                            type: MessageBoxTypes.Warning,
                                            actions: [
                                                MessageBoxActions.Delete,
                                                MessageBoxActions.Cancel,
                                            ],

                                            children:
                                                "Are sure you want to delete this control?",
                                        });
                                    }}
                                />
                                <Button
                                    icon="edit"
                                    design={ButtonDesign.Transparent}
                                    onClick={() => {
                                        setIsEdit(!isEdit);
                                    }}
                                />
                                <Button
                                    icon="decline"
                                    design={ButtonDesign.Transparent}
                                    onClick={() => {
                                        setLayout(FCLLayout.OneColumn);
                                        setIsEdit(false);
                                    }}
                                />
                            </Toolbar>
                            <Toolbar
                                key={selectedControl?.ID}
                                style={{ height: "200px" }}
                            >
                                <Avatar
                                    icon="person-placeholder"
                                    size={AvatarSize.XL}
                                    style={{ marginLeft: "12px" }}
                                />
                                <FlexBox
                                    direction={FlexBoxDirection.Column}
                                    style={{ marginLeft: "6px" }}
                                >
                                    <FlexBox>
                                        <Label>Name:</Label>
                                        <Text style={{ marginLeft: "2px" }}>
                                            {selectedControl?.CONTROL_NAME}
                                        </Text>
                                    </FlexBox>
                                    <FlexBox>
                                        <Label>Description:</Label>
                                        <Text style={{ marginLeft: "2px" }}>
                                            {selectedControl?.CONTROL_DESC}
                                        </Text>
                                    </FlexBox>
                                </FlexBox>
                            </Toolbar>

                            <Card>
                                {isEdit && (
                                    <ControlEditForm
                                        id={
                                            selectedControl
                                                ? selectedControl.ID
                                                : 0
                                        }
                                        controlName={
                                            selectedControl
                                                ? selectedControl.CONTROL_NAME
                                                : ""
                                        }
                                        controlDescription={
                                            selectedControl
                                                ? selectedControl.CONTROL_DESC
                                                : ""
                                        }
                                        setIsEdit={setIsEdit}
                                        setIsFullScreen={setIsFullScreen}
                                        setLayout={setLayout}
                                    />
                                )}
                            </Card>
                        </>
                    }
                />
            )}
        </>
    );
};

export default TypeOfControlDetails;
