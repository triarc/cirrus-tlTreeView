declare module Triarc.Web {
    interface ITreeViewServiceFactory {
        selectedNode: any;
        unselectNode(): void;
        toggleNode(node: any): void;
        toggleAll(node: any): void;
        selectNode(node: any): void;
        openNode(node: any): void;
        closeNode(node: any): void;
    }
}
