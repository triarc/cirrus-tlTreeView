var Triarc;
(function (Triarc) {
    var Web;
    (function (Web) {
        var mod = angular.module("tlTreeView");
        mod.factory("cirrusTreeViewService", function () {
            var factory = {};
            factory.selectedNode = null;
            factory.unselectNode = function () {
                if (factory.selectedNode)
                    factory.selectedNode.selected = undefined;
                factory.selectedNode = null;
            };
            factory.selectNode = function (node) {
                if (factory.selectedNode)
                    factory.selectedNode.selected = undefined;
                factory.selectedNode = node;
                node.selected = true;
            };
            factory.toggleNode = function (node) {
                // no node selected
                if (!node)
                    return;
                // no children
                if (!node.children)
                    return;
                // collapse / expand
                if (node.children && node.children.length > 0) {
                    node.collapsed = !node.collapsed;
                }
            };
            factory.toggleAll = function (node) {
                // no node selected
                if (!node)
                    return;
                // set all children equal to what the parent will be, 
                // else can get out of sync
                var collapsed = !node.collapsed;
                var iterate = function (child) {
                    if (!child.children) {
                        return;
                    }
                    else {
                        child.collapsed = collapsed;
                        for (var i = 0; i < child.children.length; i++) {
                            iterate(child.children[i]);
                        }
                    }
                };
                iterate(node);
            };
            return factory;
        });
        mod.directive("treeView", ["$compile", "cirrusTreeViewService", function ($compile, treeViewService) {
                return {
                    restrict: "A",
                    link: function (scope, elem, attrs) {
                        var model = attrs.treeView;
                        var nodeTemplate = "<div class=\"node\" ng-include=\"'" + attrs.nodeTemplate + "'\"></div>";
                        // template
                        var template = '<ul class="cirrus-tl-tree-view">' +
                            '<li ng-repeat="node in ' + model + '">' +
                            '<div>' +
                            '<div>' +
                            '<span ng-click="toggleNode(node)" ng-style="{\'visibility\': (node.children && node.children.length > 0)?\'visible\':\'hidden\'}" ng-class="!node.collapsed ? \'has-child glyphicon glyphicon-chevron-right\' : \'has-child-open glyphicon glyphicon-chevron-down\'"></span>' +
                            '<span ng-click="selectNode(node)" class=\'template-container\' ng-class="{\'selected\' : node.selected}">' +
                            nodeTemplate +
                            '</span>' +
                            '</div>' +
                            '</div>' +
                            '<div class="tree-view" collapse="!node.collapsed" tree-view="node.children" tree-root="false" node-template="' + attrs.nodeTemplate + '"></div>' +
                            '</li>' +
                            '</ul>';
                        // root node
                        if (!Triarc.hasValue(attrs.treeRoot) || attrs.treeRoot !== "false") {
                            // toggle when icon clicked
                            scope.toggleNode = function (node) {
                                treeViewService.toggleNode(node);
                            };
                            // select when name clicked
                            scope.selectNode = function (node) {
                                treeViewService.selectNode(node);
                            };
                        }
                        var compiledHtml = $compile(template)(scope);
                        elem.append(compiledHtml);
                    }
                };
            }]);
    })(Web = Triarc.Web || (Triarc.Web = {}));
})(Triarc || (Triarc = {}));

