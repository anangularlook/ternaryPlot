<%@ Page Language="C#" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body data-ng-app="myApp">
    <form id="form1" runat="server">
    <div>
    <div data-ternary-plot="" data-svg-id="svgImage" data-chart-id="svgChart" data-size="300" data-padding="25"></div>
    
    </div>
    </form>
    
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
    <script>
        var app = angular.module('myApp', []);
    </script>
    <script src="scripts/ternaryPlot.js"></script>
</body>
</html>
