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
        mode.selectMode(el);
        // if (onActivated) onActivated(element);
    }
    
    this.deactivated = () => {
        isActivated = false;
        element.removeClass('active');
        // if (onDeactivated) onDeactivated(element);
    }
    
    this.onClick(() => {
        if (!isActivated) {
            this.activated();
        }else {
            this.deactivated();
            mode.selectMode();
        }
    })

    buttons.push(this);
}

let btnCreateNode = new Button("create_node")

let btnConnectNode = new Button("connect_node")