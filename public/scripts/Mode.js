const mode = new function() {
    let modes = []

    let modeActive = null;

    this.addMode = (name, onActivated, onDeactivated) => {
        modes.push({
            name, onActivated, onDeactivated
        })
    }

    this.has = (name) => {
        return this.getMode() == name;
    }

    this.selectMode = (name = null) => {
        modeActive = null;
        modes.forEach((m, i) => {
            if (m.name == name) {
                modeActive = i;
                m.onActivated();
            }else {
                this.deactivated(m);
            }
        });
    }

    this.deactivated = (mode) => {
        buttons.forEach(button => {
            if (button.getName() == mode.name) {
                button.deactivated();
                mode.onDeactivated(false);
            }
        })
    }

    this.getModes = () => {
        return modes;
    }

    this.getMode = () => {
        return (modeActive != null) ? modes[modeActive].name : null;
    }

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
    if (isSendMsg) {
        Toast.fire({
            icon: 'info',
            title: 'Mode "Create Node" is deactivated.'
        })
    }
    map.getMap().setOptions({draggableCursor:'grab'});
})

mode.addMode("connect_node", (isSendMsg = true) => {
    // On Activated
    if (isSendMsg) {
        Toast.fire({
            icon: 'info',
            title: 'Mode "Connect Node" is activated.'
        })
    }
    map.getMap().setOptions({draggableCursor:'pointer'});
}, (isSendMsg = true) => {
    // On Deactivated
    if (isSendMsg) {
        Toast.fire({
            icon: 'info',
            title: 'Mode "Connect Node" is deactivated.'
        })
    }
    map.getMap().setOptions({draggableCursor:'grab'});
    
    if (nodeSelected) {
        nodeSelected.graph.getGraph().setMap(null);
        nodeSelected = null;
    }
})