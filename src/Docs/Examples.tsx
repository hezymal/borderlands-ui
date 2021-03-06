import * as React from "react";
import { 
    CheckButton,
    DateInput,
    Layout,
    NumberInput,
    OptionSelect,
    RadioButton,
    SimpleButton,
    TextInput,
    TimeInput,
    VirtualTable,
} from "../lib";
import * as Styles from "./Styles.scss";

function SimpleButtons() {
    return (
        <section>
            <header>Buttons</header>
            <div>
                <SimpleButton title="Default Button" onClick={() => {}} />
            </div>
            <div>
                <SimpleButton
                    title="Primary Button"
                    style="Primary"
                    onClick={() => {}}
                />
            </div>
            <div>
                <SimpleButton
                    title="Danger Button"
                    style="Danger"
                    onClick={() => {}}
                />
            </div>
            <div>
                <SimpleButton
                    title="Warning Button"
                    style="Warning"
                    onClick={() => {}}
                />
            </div>
        </section>
    );
}

class Inputs extends React.Component<{}, any> {
    constructor(props: {}) {
        super(props);

        this.state = {
            textInputValue: "Text Input",
            integerInputValue: 1234,
            floatInputValue: 12.34
        };
    }

    render(): JSX.Element {
        const {
            textInputValue,
            integerInputValue,
            floatInputValue
        } = this.state;

        return (
            <section>
                <header>Inputs</header>
                <div>
                    <TextInput
                        value={textInputValue}
                        onChange={value =>
                            this.setState({ textInputValue: value })
                        }
                    />
                </div>
                <div>
                    <NumberInput
                        value={integerInputValue}
                        onChange={value =>
                            this.setState({ integerInputValue: value })
                        }
                    />
                </div>
                <div>
                    <NumberInput
                        value={floatInputValue}
                        isFloat={true}
                        onChange={value =>
                            this.setState({ floatInputValue: value })
                        }
                    />
                </div>
            </section>
        );
    }
}

class CheckButtons extends React.Component<{}, any> {
    constructor(props: {}) {
        super(props);

        this.state = {
            value: false
        };
    }

    render() {
        const { value } = this.state;

        return (
            <section>
                <header>Check button</header>
                <div>
                    <CheckButton
                        value={value}
                        onChange={newValue =>
                            this.setState({ value: newValue })
                        }
                    />
                </div>
            </section>
        );
    }
}

class RadioButtonGroup extends React.Component<{}, any> {
    constructor(props: {}) {
        super(props);

        this.state = {
            value: 1
        };
    }

    render() {
        const { value } = this.state;

        return (
            <section>
                <header>Radio button group</header>
                <div>
                    <RadioButton
                        value={1}
                        checked={value === 1}
                        onSelect={value => this.setState({ value })}
                    />
                    <RadioButton
                        value={2}
                        checked={value === 2}
                        onSelect={value => this.setState({ value })}
                    />
                    <RadioButton
                        value={3}
                        checked={value === 3}
                        onSelect={value => this.setState({ value })}
                    />
                </div>
            </section>
        );
    }
}

class DateAndTimeInputs extends React.Component<{}, any> {
    constructor(props: {}) {
        super(props);

        this.state = {
            value1: "00:00",
            value2: "00:00:00",
            value3: "01.01.2018"
        };
    }

    render() {
        const { value1, value2, value3 } = this.state;

        return (
            <section>
                <header>Data and time inputs</header>
                <div>
                    <TimeInput
                        value={value1}
                        onChange={newValue =>
                            this.setState({ value1: newValue })
                        }
                    />
                </div>
                <div>
                    <TimeInput
                        value={value2}
                        secondComponent={true}
                        onChange={newValue =>
                            this.setState({ value2: newValue })
                        }
                    />
                </div>
                <div>
                    <DateInput
                        value={value3}
                        onChange={newValue =>
                            this.setState({ value3: newValue })
                        }
                    />
                </div>
            </section>
        );
    }
}

class OptionsSelects extends React.Component<{}, any> {
    constructor(props: {}) {
        super(props);

        this.state = {
            value1: "red"
        };
    }

    render() {
        const { value1 } = this.state;

        return (
            <section style={{ display: "block" }}>
                <header>Option selects</header>
                <div>
                    <OptionSelect
                        value={value1}
                        options={[
                            { title: "Red", value: "red" },
                            { title: "Green", value: "green" },
                            { title: "Blue", value: "blue" }
                        ]}
                        onChange={newValue =>
                            this.setState({ value1: newValue })
                        }
                    />
                </div>
            </section>
        );
    }
}

class Tables extends React.Component<{}, any> {
    static words = [
        "Yello", "Red", "Green", "Blue", "Mellow", 
        "Cyber", "Royal", "Trombone", "Banana", "Flax"
    ];

    constructor(props: {}) {
        super(props);

        this.generateData = this.generateData.bind(this);

        this.state = {
            data: this.generateData(20),
        };
    }

    render() {
        const { data } = this.state;

        return (
            <section style={{ display: "block" }}>
                <header>Tables</header>
                <div style={{ height: "200px" }}>
                    <VirtualTable
                        columns={[
                            { 
                                id: "id", 
                                title: "#", 
                                getValue: (value) => { console.log(value); return value; },
                                width: 100,
                            },
                            { 
                                id: "name", 
                                title: "Name",
                                width: 100,
                            },
                        ]}
                        data={data}
                    />
                </div>
            </section>
        );
    }

    private generateData(size: number) {
        const data: any[] = [];

        for (let i = 1; i <= size; i++) {
            data.push({
                id: i,
                name: Tables.words[(i - 1) % 10],
            });
        }

        return data;
    }
}

function Examples() {
    return (
        <Layout className={Styles.Examples}>
            <SimpleButtons />
            <Inputs />
            <CheckButtons />
            <RadioButtonGroup />
            <DateAndTimeInputs />
            <OptionsSelects />
            <Tables />
        </Layout>
    );
}

export default Examples;
