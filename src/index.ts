//библиотека
class UiObject {
}

class MenuItem extends UiObject {
    enabled: boolean;
    onClick = (handler: () => void) => {
        if (this.enabled) {
            handler();
        }
    }
}

class ToolbarButton extends UiObject {
    enabled: boolean;
}

class Control extends UiObject {
    enabled: boolean;
    onClick = (handler: () => void) => {
        if (this.enabled) {
            handler();
        }
    }
}

class Button extends Control {

}

class RadioButton extends Control {

}

class Checkbox extends Control {

}

//клиентский код

//клиентский интерфейс
interface UiElement {
    enabled: boolean;
    onClick: (handler: () => void) => void
}


//адаптер для работы клиентского интерфейса с библиотекой
class UiObjectAdapter implements UiElement {
    adapted: UiObject;

    constructor(adapted: UiObject) {
        this.adapted = adapted;
    }

    set enabled(value: boolean) {
        if (this.adapted instanceof MenuItem || this.adapted instanceof ToolbarButton || this.adapted instanceof Control) {
            this.adapted.enabled = value;
        }
    }

    get enabled() {
        if (this.adapted instanceof ToolbarButton || this.adapted instanceof ToolbarButton || this.adapted instanceof Control) {
            return this.adapted.enabled;
        }
    }

    onClick = (handler: () => void) => {
        if (this.adapted instanceof MenuItem || this.adapted instanceof Control) {
            this.adapted.onClick(handler);
        }

        if (this.adapted instanceof ToolbarButton) {
            if (this.adapted) {
                handler();
            }
        }
    };
}

abstract class Action {
    private controls: Array<UiObjectAdapter>;
    public _enabled: boolean;

    get enabled(): boolean {
        return this._enabled;
    }

    set enabled(value: boolean) {
        this._enabled = value;
        this.controls.forEach((control: UiObjectAdapter) => {
            control.enabled = value;
        });
    }

    setControls(controls: UiObjectAdapter[]) {
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

const menuItem = new UiObjectAdapter(new MenuItem());
const toolbarButton = new UiObjectAdapter(new ToolbarButton());
const radioButton = new UiObjectAdapter(new RadioButton());
const control = new UiObjectAdapter(new Control());

action.setControls([menuItem, control, radioButton, toolbarButton]);
action.enabled = true;

menuItem.onClick(action.execute);
