let buttons = [];
function Button(el, onActivated = null, onDeactivated = null, isActivated = false) {

    let element = $("#" + el);

    if (isActivated) this.activated();

    this.onClick = (callback) => {
        return element.click(callback);
    }

    this.getName = () => {
        return el;
    }

    this.isDisabled = () => {
        return element.hasClass('disabled');
    }

    this.isActivated = () => {
        return element.hasClass('active');
    }

    this.activated = () => {
        if (!this.isDisabled()) {
            element.addClass('active');
            if (onActivated) onActivated(element);
        }
    }

    this.enabled = () => {
        element.removeClass('disabled');
        if (element.hasClass('static')) {
            this.activated();
        }
    }

    this.disabled = () => {
        element.addClass('disabled');
        if (this.isActivated()) this.deactivated();
    }
    
    this.deactivated = () => {
        element.removeClass('active');
        if (onDeactivated) onDeactivated(element);
    }
    
    this.onClick(() => {
        if (!this.isActivated()) {
            this.activated();
        }else {
            if (!element.hasClass('static')) {
                this.deactivated();
                mode.deactivateMode(el);
            }else {
                this.disabled();
            }
        }
    })

    buttons.push(this);
}


// Button Create Node
let btnCreateNode = new Button("create_node", () => {
    mode.activateMode('create_node');

    btnConnectNode.deactivated();
    btnRemoveNode.deactivated();
    mode.deactivateMode('connect_node');
    mode.deactivateMode('remove_node');

    map.getMap().setOptions({draggableCursor:'pointer'});
}, () => {
    map.getMap().setOptions({draggableCursor:'grab'});
})


// Button Connect Node
let btnConnectNode = new Button("connect_node", () => {
    mode.activateMode('connect_node');

    btnCreateNode.deactivated();
    btnRemoveNode.deactivated();
    mode.deactivateMode('create_node');
    mode.deactivateMode('remove_node');

    map.getMap().setOptions({draggableCursor:'pointer'});
}, () => {
    map.getMap().setOptions({draggableCursor:'grab'});
})


// Button Remove Node
let btnRemoveNode = new Button("remove_node", () => {
    mode.activateMode('remove_node');

    btnCreateNode.deactivated();
    btnConnectNode.deactivated();
    mode.deactivateMode('create_node');
    mode.deactivateMode('connect_node');

    map.getMap().setOptions({draggableCursor:'pointer'});
}, () => {
    map.getMap().setOptions({draggableCursor:'grab'});
})

// Button Set Visible Graph
let btnGraphVisible = new Button("show_graph", () => {
    mode.activateMode('show_graph');
    Nodes.setVisible(true);
    Graphs.setVisible(true);
}, () => {
    mode.deactivateMode('show_graph');
    Nodes.setVisible(false);
    Graphs.setVisible(false);
})

// Button Set Position
let btnSetPosition = new Button("set_position", () => {
    mode.activateMode('set_position');

    btnSetDestination.deactivated();
    mode.deactivateMode('set_destination');

    map.getMap().setOptions({draggableCursor:'pointer'});
}, () => {
    map.getMap().setOptions({draggableCursor:'grab'});
})

// Button Set Destination
let btnSetDestination = new Button("set_destination", () => {
    mode.activateMode('set_destination');
    
    btnSetPosition.deactivated();
    mode.deactivateMode('set_position');

    map.getMap().setOptions({draggableCursor:'pointer'});
}, () => {
    map.getMap().setOptions({draggableCursor:'grab'});
})

// Button Set Visible Graph
let btnStartFindPath = new Button("start_find_path", () => {

}, () => {
    
    if (btnSetPosition.isActivated()) {
        btnSetPosition.deactivated();
        mode.deactivateMode('set_position');
    }
    
    if (btnSetDestination.isActivated()) {
        btnSetDestination.deactivated();
        mode.deactivateMode('set_destination');
    }

    if (Algorithm.getUserPosition() != null && Algorithm.getDestinationPosition() != null) {
        btnStartFindPath.enabled();
    }

    Algorithm.startFindPath();
})

let btnReset = new Button("reset", () => {

}, () => {
    
    if (btnSetPosition.isActivated()) {
        btnSetPosition.deactivated();
        mode.deactivateMode('set_position');
    }
    
    if (btnSetDestination.isActivated()) {
        btnSetDestination.deactivated();
        mode.deactivateMode('set_destination');
    }

    Algorithm.reset();
    
    if (Algorithm.getUserPosition() == null && Algorithm.getDestinationPosition() == null) {
        btnStartFindPath.disabled();
    }

})