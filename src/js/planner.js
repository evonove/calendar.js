;(function(window, undefined) { 'use strict';

    // PlanningChart class
    // -------------------

    var PlanningChart = function (element, options) {
        // TODO: if [data-planner="container"], raise an error for twice initialization

        // Get all options from data-attributes and merge them with ALL defaults
        var attributes = window.Planner.Utils.getAttributes(element);
        options = window.Planner.Utils.extend(
          {},
          PlanningChart.DEFAULTS,
          window.Planner.Plugins.DEFAULTS,
          attributes,
          options);

        // Plugins loading
        options.plugins = options.plugins || (typeof options.plugins === 'string' && options.plugins.split(' ')) || [];

        // Put there all default plugins
        options.plugins.push('slider');

        // Return instance
        return new window.Planner.Instance(element, options);
    };

    PlanningChart.CONST = {
        ALIGNMENT: {
            TOP: 0,
            MIDDLE: 1
        }
    };

    PlanningChart.DEFAULTS = {
        // TODO: use a better strategy to avoid planner draw
        show: true,
        // model: Planner.Models.Card, TODO: disabled for now
        plugins: [],
        timeslots: 4,
        timeslotHeight: 25,
        timeslotPadding: 20,
        cardTitleMargin: 6,
        centered: PlanningChart.CONST.ALIGNMENT.TOP,
        columnLabels: [],
        rowLabels: [],
        visibleColumns: 7
    };

    // Initialize with data-api
    // ------------------------

    document.addEventListener('DOMContentLoaded', function(){
        var plannerElements = document.querySelectorAll('[data-planner=""]');

        for (var i = 0; i < plannerElements.length; i++) {
            PlanningChart(plannerElements[i]);
        }
    });

    window.Planner = PlanningChart;

})(window);
