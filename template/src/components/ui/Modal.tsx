import React, {memo, useEffect, useState} from "react";
import {Modal as RNModal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ActiveOpacity, Borders, Colors, FontSizes, FontWeights, HitSlop, Margins, Paddings} from "~/config/ui";
import EventEmitter from "~/services/eventEmitter";
import Icon from "./Icon";
import Button from "./Button";

export interface ModalAction {
    label: string;
    type: "primary" | "secondary";
    onClick: () => any;
}

export interface ShowModalParams {
    title?: string;
    haveCancel?: boolean;
    actions?: ModalAction[];
    description?: string;
    contentComponent?: any;
    onCancel?: () => any;
}

const Modal = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [data, setData] = useState<Nullable<ShowModalParams>>(null);

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
        setData(null);
    };

    useEffect(() => {
        const showListener = EventEmitter.addListener(
            EventEmitter.Events.General.ShowModal,
            (params: ShowModalParams) => {
                setData(params);
                showModal();
            },
        );
        const hideListener = EventEmitter.addListener(EventEmitter.Events.General.HideModal, () => {
            hideModal();
        });

        return () => {
            showListener();
            hideListener();
        };
    }, []);

    const _onCancel = () => {
        data?.onCancel?.();
        hideModal();
    };

    const _onClick = (action: ModalAction) => {
        action.onClick?.();
        hideModal();
    };

    return (
        <RNModal
            animationType="fade"
            presentationStyle={"overFullScreen"}
            transparent={true}
            visible={!!data && visible}>
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        {data?.title ? <Text style={styles.title}>{data.title}</Text> : <View/>}
                        <TouchableOpacity
                            hitSlop={HitSlop}
                            onPress={hideModal}
                            style={styles.closeContainer}
                            activeOpacity={ActiveOpacity}>
                            <Icon name={"close"} family={"mi"} color={Colors.text_200}/>
                        </TouchableOpacity>
                    </View>
                    {data?.description ? <Text style={styles.description}>{data.description}</Text> : null}
                    {!!data && visible && data?.contentComponent ? data?.contentComponent() : null}
                    <View style={styles.actionsContainer}>
                        {data?.haveCancel ? (
                            <Button label={"Cancel"} onPress={_onCancel} type={"secondary"}
                                style={styles.cancelButton}/>
                        ) : null}
                        {data?.actions?.map((i: ModalAction) => (
                            <Button label={i.label} style={styles.actionButton} key={i.label} type={i.type}
                                onPress={() => _onClick(i)}/>
                        ))}
                    </View>
                </View>
            </View>
        </RNModal>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "rgba(9, 30, 66, 0.3)",
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        backgroundColor: Colors.white,
        width: "90%",
        padding: Paddings.medium,
        borderRadius: Borders.normal,
    },
    title: {
        fontSize: FontSizes.medium,
        fontWeight: FontWeights.bold,
        color: Colors.text,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: Margins.semiSmall,
    },
    closeContainer: {
        padding: Paddings.smallest,
        borderRadius: Borders.max,
        backgroundColor: Colors.core_100,
    },
    description: {
        color: Colors.text,
        fontSize: FontSizes.normal,
        marginBottom: Margins.semiSmall,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: Margins.normal,
    },
    cancelButton: {
        flex: 0,
    },
    actionButton: {
        marginLeft: Margins.smaller,
        flex: 0,
    },
});

export default memo(Modal);
