import * as React from "react";
import * as Styles from "./VirtualTable.scss";
import IColumn from "./IColumn";
import HeadComponent from "./HeadComponent";
import BodyComponent from "./BodyComponent";
import * as Browser from "Utils/Browser";

namespace VirtualTable {
    export interface IProps<TItem> {
        columns: IColumn<TItem>[];
        data: TItem[];
    }

    export interface IState<TItem> {
        columns: IColumn<TItem>[];
        headHeight: number;
        height: number;
        resizerIndex: number;
        resizerX: number;
    }
}

class VirtualTable<TItem> extends React.Component<VirtualTable.IProps<TItem>, VirtualTable.IState<TItem>> {
    private container: React.RefObject<HTMLDivElement>;

    public constructor(props: VirtualTable.IProps<TItem>) {
        super(props);

        this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
        this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
        this.onResizerStart = this.onResizerStart.bind(this);

        this.container = React.createRef();

        this.state = {
            columns: props.columns,
            headHeight: -1,
            height: -1,
            resizerIndex: -1,
            resizerX: null,
        };
    }

    public componentDidMount() {
        window.document.documentElement.addEventListener("mouseup", this.onDocumentMouseUp);
        window.document.documentElement.addEventListener("mousemove", this.onDocumentMouseMove);

        const container = this.container.current;
        const headElements = container.getElementsByClassName(HeadComponent.Styles.HeadComponent);
        const headElement = headElements.item(0) as HTMLDivElement;
        
        this.setState({ 
            height: container.offsetHeight,
            headHeight: headElement.offsetHeight,
        });
    }

    public componentWillUnmount() {
        window.document.documentElement.removeEventListener("mouseup", this.onDocumentMouseUp);
        window.document.documentElement.removeEventListener("mousemove", this.onDocumentMouseMove);
    }

    public render() {
        const { data } = this.props;
        const { columns, height, headHeight } = this.state;

        return (
            <div className={Styles.VirtualTable} ref={this.container}>
                <HeadComponent
                    columns={columns}
                    onResizerStart={this.onResizerStart}
                />
                {height !== -1 && <BodyComponent
                    columns={columns}
                    data={data}
                    tableHeight={height - headHeight}
                />}
            </div>
        );
    }

    private onDocumentMouseMove(e: MouseEvent) {
        const resizerIndex = this.state.resizerIndex;
        
        if (resizerIndex !== -1) {
            Browser.clearSelection();

            const resizerX = this.state.resizerX;
            const columns = this.state.columns;
            
            const newResizerX = e.pageX;
            const newColumns = columns.map((column, columnIndex) => {
                if (columnIndex === resizerIndex) {
                    const newWidth = column.width + (newResizerX - resizerX);

                    return { ...column, width: newWidth };
                } else {
                    return column;
                }
            });

            this.setState({ resizerX: newResizerX, columns: newColumns });
        }
    }

    private onDocumentMouseUp(e: MouseEvent) {
        const resizerIndex = this.state.resizerIndex;

        if (resizerIndex !== -1) {
            Browser.clearSelection();

            this.setState({ resizerIndex: -1 });
        }
    }

    private onResizerStart(resizerX: number, resizerIndex: number) {
        this.setState({ resizerX, resizerIndex });
    }
}

export default VirtualTable;