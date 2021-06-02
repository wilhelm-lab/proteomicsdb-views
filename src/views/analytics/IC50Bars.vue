<template>
  <div
      ref="container"
      id="ic50bars-container"
      class="sapProteomicsdbIC50Bars"
      :style="containerStyle"
  >
  </div>
</template>

<script>
import utils from "../../vue-d3-component-wrappers/common-lib/Utils";
import d3tip from 'd3-tip';

const d3 = require('d3');
d3.tip = d3tip;

export default {
  name: "IC50Bars",
  props: {
    plotHeight: {
      type: Number,
      default: 200
    },
    barWidth: {
      type: Number,
      default: 10
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selectedProtein: { // protein selected through Dropdown
      type: Object,
      default: undefined
    },
    activeProtein: { // protein selected through onClick
      type: Object,
      default: undefined
    },
    title: {
      type: String, // TODO: Originall object?
      default: ""
    }
  },
  data: function () {
    return {
      bars: null,
      chartObjects: {},
      svg: null,
    }
  },
  computed: {
    containerStyle: function () {
      return {
        height: this.plotHeight + "px",
      }
    }
  },
  watch: {
    data: function () {
      this.refresh();
    },
    activeProtein: function () {
      //this.refresh();
      this.updateBarColor();
    }
  },
  mounted: function () {
    this.refresh();
  },
  methods: {
    refresh: function () {
      var that = this;
      var oData = this.data;
      if (!oData || !oData.data) {
        return;
      }

      oData.data = oData.data.sort(function (a, b) {
        return that.convertEC50topEC50(b.VALUE) - that.convertEC50topEC50(a.VALUE);
      });
      this.drawPlot(oData);
    },
    drawPlot: function (oData) {
      var that = this;
      var $Plot = this.$refs.container;

      var margin = {
        top: 40,
        right: 230,
        bottom: 80,
        left: 50
      };

      var height = $Plot.clientHeight - margin.top - margin.bottom;
      var barWidth = this.barWidth;
      var width = Math.max(oData.data.length * barWidth, 0);

      d3.select("#ic50bars-container").select("svg").remove();

      var svg = d3.select("#ic50bars-container").append('svg')
          .attr('class', 'IC50Bars')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom);
      this.svg = svg;

      var legend = svg.append('g');

      var content = svg
          .append('g')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

      // Y-AXIS
      // limit min Y value to prevent unreadable values
      var Y_LIMIT = 0.1;
      var minY = Math.max(d3.min(oData.data, function (d) {
        return that.convertEC50topEC50(d.VALUE);
      }), Y_LIMIT);
      var y = d3.scaleLinear()
          .domain([
            minY,
            d3.max(oData.data, function (d) {
              return that.convertEC50topEC50(d.VALUE);
            })
          ])
          .range([height, 0])
          .nice();

      var yAxis = d3.axisLeft()
          .scale(y);

      content.append('g')
          .attr('class', 'y axis')
          .attr('height', height)
          .call(yAxis)
          .selectAll('text')
          .attr('y', 4)
          .attr('x', -10)
          .style('text-anchor', 'end');

      content.append('text')
          .attr('class', 'AxisTitle')
          .attr('text-anchor', 'middle')
          .attr('transform', 'rotate(-90)')
          .attr('x', -height / 2)
          .attr('y', -35)
          .style('font-size', '12px')
          .text('pEC50');

      // DATA BARS
      var bars = content.append('g');
      var bar = bars.selectAll('g')
          .data(oData.data)
          .enter().append('g')
          .attr('transform', function (d, i) {
            return 'translate(' + (i * barWidth + 1) + ', 0)';
          });

      var barTooltip = d3.tip().attr('class', 'd3-tip').html(function (d) {
        return d.GENE_NAME + '<br>pEC50: ' + that.convertEC50topEC50(d.VALUE).toFixed(2)
      })
          .direction('n')
      svg.call(barTooltip);

      // store bars in chartObjects
      this.chartObjects.bars = bar.append('rect')
          .attr('class', function (d) {
            return that.getBarStyleClasses(d);
          })
          .attr('height', function (d) {
            return height - y(that.convertEC50topEC50(d.VALUE));
          })
          .attr('width', barWidth - 1)
          .attr('y', function (d) {
            return y(that.convertEC50topEC50(d.VALUE));
          })
          .attr('PROTEIN_ID', function (d) {
            return d.PROTEIN_ID;
          })
          .on('mouseover', barTooltip.show)
          .on('mouseout', barTooltip.hide)
      ;

      bar.append('a')
          .attr('href', function (d) {
            return '/vue/protein/' + d.PROTEIN_ID + '/summary'; // TODO: /vue/ hardcoded, look for alternative
          })
          .attr('target', '_blank')
          .append('text')
          .attr('x', 2)
          .attr('y', height + 3)
          .attr('dy', '.75em')
          .attr('class', 'ProteinLabel')
          .attr('transform', 'rotate(-65 0,' + (height + 3) + ')')
          .text(function (d) {
            return d.GENE_NAME || d.PROTEIN_ID;
          });

      // Tooltip
      //$('.IC50Bars .IC50ProteinBar').tipsy({
      //  gravity: 'w',
      //  html: true,
      //  title: function () {
      //    return this.__data__.GENE_NAME + '<br>pEC50: ' + that.convertEC50topEC50(this.__data__.VALUE).toFixed(2);
      //  }
      //});

      // Title
      var title = svg.append('text')
          .attr('class', 'IC50Title')
          .attr('x', margin.left)
          .attr('y', 20)
          .attr('text-anchor', 'start')
          .text(this.title);

      utils.expandChartSizeToTitle(svg, title, width, margin);

      // Legend
      var legendTooltip = d3.tip()
          .attr('class', 'd3-tip')
          .html("Drug targets with an pEC50 ratio of < 1 (green)," +
              "<br>1-10 (blue) and > 10 (grey)<br>compared to the reference (red).");
      legend
          .attr('transform', 'translate(' + (width + margin.left) + ',' + ((height - that.getLegendHeight()) / 2 + margin.top) + ')')
          .attr('class', 'IC50Legend')
          .call(legendTooltip)
          .on('mouseover', legendTooltip.show)
          .on('mouseout', legendTooltip.hide)

      legend.append('text')
          .attr('x', 15)
          .attr('y', 20)
          .attr('text-anchor', 'left')
          .attr('style', 'font-weight:700')
          .text('Relative pEC50 to target protein:');

      for (var i = 0; i < 4; i++) {
        var sClass = that.getLegendStyleClass(i);
        var sText = that.getLegendText(i);
        var iTransformation = that.getLegendTransformation(i);

        var item = legend.append('g')
            .attr('transform', 'translate(' + 15 + ',' + iTransformation + ')')
            .attr('class', 'IC50LegendGroup');
        item.append('rect')
            .attr('x', 10)
            .attr('y', 10)
            .attr('width', 10)
            .attr('height', 10)
            .attr('class', sClass);

        item.append('text')
            .attr('x', 22)
            .attr('y', 18)
            .attr('text-anchor', 'start')
            .text(sText);
      }

      this.addOnClickEvents();
    },
    addOnClickEvents: function addOnClickEvents() {
      var that = this;
      d3.selectAll('.IC50ProteinBar').on('click', function () {
        that.$emit('select-protein', {
          PROTEIN_ID: this.__data__.PROTEIN_ID,
          GENE_NAME: this.__data__.GENE_NAME,
          VALUE: that.convertEC50topEC50(this.__data__.VALUE)
        })
      });
      that.updateBarColor();
    },
    updateBarColor: function updateBarColor() {
      var that = this;
      var bars = that.chartObjects.bars;
      bars.attr('class', function (d) {
        return that.getBarStyleClasses(d);
      });
    },
    getBarStyleClasses: function getBarStyleClasses(d) {
      var that = this;
      var sClasses = 'IC50ProteinBar';
      var oSelected = this.selectedProtein;
      var oActive = this.activeProtein || oSelected;
      if (oSelected) {
        if (d.PROTEIN_ID === oSelected.PROTEIN_ID) {
          sClasses += ' IC50SelectedProtein';
        } else if (that.convertEC50topEC50(d.VALUE) > that.convertEC50topEC50(oSelected.VALUE)) {
          sClasses += ' IC50BetterValue';
        } else if (that.convertEC50topEC50(d.VALUE) >= that.convertEC50topEC50(oSelected.VALUE) - 1) {
          sClasses += ' IC50AtMostTenfold';
        } else {
          sClasses += ' IC50AtMoreThanTenfold';
        }
      }
      if (oActive && d.PROTEIN_ID === oActive.PROTEIN_ID) {
        sClasses += ' IC50ActiveProtein';
      }
      return sClasses;
    },

    getLegendStyleClass: function getLegendStyleClass(i) {
      var aClass = ['IC50BetterValue', 'IC50SelectedProtein', 'IC50AtMostTenfold', 'IC50MoreThanTenfold'];
      return aClass[i];
    },

    getLegendText: function getLegendText(i) {
      var aTexts = ['< 1', '= 1 (target protein)', '1 - 10', '> 10'];
      return aTexts[i];
    },

    getLegendTransformation: function getLegendTransformation(i) {
      var aTransformation = [15, 30, 45, 60];
      return aTransformation[i];
    }
    ,
    getLegendHeight: function getLegendHeight() {
      return 75;
    }
    ,

    /*
     *  Converts log10 EC50 values to pEC50 values
     */
    convertEC50topEC50: function convertEC50topEC50(nValue) {
      // Convert log10 ec50 to ec50 in nM
      var ec50 = Math.pow(10, nValue);
      // Convert nM to M
      var ec50M = ec50 / 1000000000;
      // Convert to pEC50
      var pEC50 = -(Math.log(ec50M) / Math.log(10));
      return pEC50;
    },
    getSVG: function () {
      return d3.select(this.$el).selectAll('svg').node();
    }
  }
}
</script>

<style>
.IC50ProteinBar {
  cursor: pointer;
}

.IC50Bars .IC50ProteinBar,
.IC50Legend .IC50MoreThanTenfold {
  fill: lightgrey;
}

.IC50Bars .IC50ProteinBar.IC50SelectedProtein,
.IC50Legend .IC50SelectedProtein {
  fill: red;
}

.IC50Bars .IC50BetterValue {
  fill: lightgreen;
}

.IC50Bars .IC50AtMostTenfold {
  fill: lightblue;
}

.IC50Bars .IC50ProteinBar.IC50ActiveProtein {
  stroke: #000000;
  stroke-width: 1px;
}

.IC50Bars a .ProteinLabel {
  font-family: Arial, Helvetica, sans-serif;
  font: 10px sans-serif;
  text-anchor: end;
  fill: #00679e;
}

.IC50Bars .Inhibitor {
  font-family: Arial, Helvetica, sans-serif;
  font: 12px sans-serif;
  font-weight: bold;
  text-anchor: middle;
}

.IC50Bars .AxisTitle {
  font-family: Arial, Helvetica, sans-serif;
  font: 10px sans-serif;
  text-anchor: middle;
}

.IC50Legend {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
}

.IC50LegendGroup {
  font-family: Arial, Helvetica, sans-serif;
  font: 12px sans-serif;
}

.IC50Bars .IC50Title {
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
}

.d3-tip {
  font-size: 11px;
  text-align: center;
}

</style>
