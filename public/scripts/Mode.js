const mode = new function() {
    let modes = []

    let modeActive = null;

    this.addMode = (name, onActivated, onDeactivated) => {
        modes.push({
            name, onActivated, onDeactivated, isActive: false,
        })
    }

    this.has = (name) => {
        let result = false;
        modes.forEach((m, i) => {
            if (m.name == name) {
                if (m.isActive) result = true;
            }
        });
        return result;
    }

    this.selectMode = (name = null) => {
        modes.forEach((m, i) => {
            if (m.name == name) {
                m.isActive = true;
                m.onActivated();
            }else {
                m.isActive = false;
                if (m.onDeactivated) m.onDeactivated(false);
            }
        });
    }

    this.activateMode = (name) => {
        modes.forEach((m, i) => {
            if (m.name == name) {
                m.isActive = true;
                if (m.onActivated) m.onActivated();
            }
        });
    }
    
    this.deactivateMode = (name) => {
        modes.forEach((m, i) => {
            if (m.name == name) {
                m.isActive = false;
                if (m.onDeactivated) m.onDeactivated(false);
            }
        });
    }

    this.getModes = () => {
        return modes;
    }

    // this.getMode = () => {
    //     return (modeActive != null) ? modes[modeActive].name : null;
    // }

    return this;
};

mode.addMode("create_node", (isSendMsg = true) => {
    // On Activated
    if (isSendMsg) {
        Toast.fire({
            icon: 'info',
            title: 'Mode "Create Node" is activated.'
        })
    }
    map.getMap().setOptions({draggableCursor:'pointer'});
}, (isSendMsg = true) => {
    // On Deactivated
    // if (isSendMsg) {
    //     Toast.fire({
    //         icon: 'info',
    //         title: 'Mode "Create Node" is deactivated.'
    //     })
    // }
})

mode.addMode("connect_node", (isSendMsg = true) => {
    // On Activated
    if (isSendMsg) {
        Toast.fire({
            icon: 'info',
            title: 'Mode "Connect Node" is activated.'
        })
    }
}, (isSendMsg = true) => {
    // On Deactivated
    
    if (nodeSelected) {
        nodeSelected.graph.getGraph().setMap(null);
        nodeSelected = null;
    }
})

mode.addMode("remove_node", (isSendMsg = true) => {
    // On Activated
    if (isSendMsg) {
        Toast.fire({
            icon: 'info',
            title: 'Mode "Remove Node" is activated.'
        })
    }
}, (isSendMsg = true) => {
    // On Deactivated
    // if (nodeSelected) {
    //     nodeSelected.graph.getGraph().setMap(null);
    //     nodeSelected = null;
    // }
})

mode.addMode("show_graph", (isSendMsg = true) => {
    // On Activated
    if (isSendMsg) {
        Toast.fire({
            icon: 'info',
            title: 'Mode "Show Graph" is activated.'
        })
    }
}, (isSendMsg = true) => {
    // On Deactivated
    if (isSendMsg) {
        Toast.fire({
            icon: 'info',
            title: 'Mode "Show Graph" is deactivated.'
        })
    }
})

mode.addMode("set_position", (isSendMsg = true) => {
    // On Activated
    if (isSendMsg) {
        Toast.fire({
            icon: 'info',
            title: 'Mode "Set User Position" is activated.'
        })
    }
});

mode.addMode("set_destination", (isSendMsg = true) => {
    // On Activated
    if (isSendMsg) {
        Toast.fire({
            icon: 'info',
            title: 'Mode "Set Destination Position" is activated.'
        })
    }
});