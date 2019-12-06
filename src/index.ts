//библиотека
class UiObject {
}

class MenuItem extends UiObject {
    enabled: boolean;
    onClick = (handler: () => void) => {
        handler();
    }
}

class ToolbarButton extends UiObject {
    enabled: boolean;
}

class Control extends UiObject {
    enabled: boolean;
    onClick = (handler: () => void) => {
        handler();
    }
}

class Button extends Control {

}

class RadioButton extends Control {

}

class Checkbox extends Control {

}

//клиентский код

interface UiElement {
    enabled: boolean;
    onClick: (handler: () => void) => void
}

class ToolbarButtonAdapter implements UiElement {
    private toolbarButton: ToolbarButton;

    constructor(adaptElement: ToolbarButton) {
        this.toolbarButton = adaptElement;
    }

    set enabled(value: boolean) {
        this.toolbarButton.enabled = value;
    }

    get enabled() {
        return this.toolbarButton.enabled;
    }

    onClick = (handler: () => void) => {
            handler();
    }
}

abstract class Action {
    private controls: Array<UiElement>;
    public _enabled: boolean;

    get enabled(): boolean {
        return this._enabled;
    }

    set enabled(value: boolean) {
        this._enabled = value;
        this.controls.forEach((control: UiElement) => {
            control.enabled = value;
        });
    }

    setControls(controls: UiElement[]) {
        this.controls = controls;
    }

    abstract execute(): void;
}

class ExploerUpActions extends Action {
    execute(): void {
        console.log('ExploerUpActions')
    }
}


const action = new ExploerUpActions();

const menuItem = new MenuItem();
const toolbarButton = new ToolbarButtonAdapter(new ToolbarButton());
const radioButton = new RadioButton();
const control = new Control();

action.setControls([menuItem, control, radioButton, toolbarButton]);
action.enabled = true;

toolbarButton.onClick(action.execute);

