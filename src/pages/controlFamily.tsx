import {
    Title,
    DynamicPage,
    DynamicPageTitle,
    MessageStrip,
    Button,
    Bar,
    Modals,
    ButtonDomRef,
} from "@ui5/webcomponents-react";
import { ThemingParameters } from "@ui5/webcomponents-react-base";
import ControlFamilyDetails from "../components/ControlFamilyDetails";
import ControlFamilyCreationForm from "../components/ControlFamilyCreation";
import { useRef } from "react";

const ControlFamily = () => {
    const showDialog = Modals.useShowDialog();
    const closeButtonRoleref = useRef<ButtonDomRef>(null);
    return (
        <DynamicPage
            headerTitle={
                <DynamicPageTitle
                    expandedContent={
                        <MessageStrip>
                            Information (You can see the Control Family Details
                            and when these are created & by whom.)
                        </MessageStrip>
                    }
                    header={<Title>Control Family Details</Title>}
                    actions={
                        <Button
                            design="Emphasized"
                            tooltip="Create"
                            icon="create"
                            onClick={() => {
                                const { close } = showDialog({
                                    headerText: "User Information",
                                    children: (
                                        <>
                                            <ControlFamilyCreationForm
                                                closeButtonref={
                                                    closeButtonRoleref
                                                }
                                            />
                                        </>
                                    ),
                                    footer: (
                                        <Bar
                                            endContent={
                                                <>
                                                    <Button
                                                        onClick={() => close()}
                                                        design="Negative"
                                                        ref={closeButtonRoleref}
                                                    >
                                                        Close
                                                    </Button>
                                                </>
                                            }
                                        ></Bar>
                                    ),
                                });
                            }}
                        >
                            Create
                        </Button>
                    }
                    snappedContent={
                        <MessageStrip>
                            Information (only visible if header content is
                            collapsed/snapped)
                        </MessageStrip>
                    }
                ></DynamicPageTitle>
            }
            style={{
                borderRadius: ThemingParameters.sapButton_BorderCornerRadius,
            }}
            showHideHeaderButton={false}
            headerContentPinnable={false}
        >
            <ControlFamilyDetails />
        </DynamicPage>
    );
};

export default ControlFamily;
