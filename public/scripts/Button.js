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

    this.isActivated = () => {
        return isActivated;
    }

    this.activated = () => {
        isActivated = true;
        element.addClass('active');
        if (onActivated) onActivated(element);
    }
    
    this.deactivated = () => {
        isActivated = false;
        element.removeClass('active');
        if (onDeactivated) onDeactivated(element);
    }
    
    this.onClick(() => {
        if (!isActivated) {
            this.activated();
        }else {
            this.deactivated();
            mode.deactivateMode(el);
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

// Button Set Visible Graph
// let btnSetPosition = new Button("set_position", () => {
//     mode.activateMode('set_position');

//     btnSetDestination.deactivated();
//     mode.deactivateMode('set_destination');

//     map.getMap().setOptions({draggableCursor:'pointer'});
// }, () => {
//     map.getMap().setOptions({draggableCursor:'grab'});
// })