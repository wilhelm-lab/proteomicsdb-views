jQuery.sap.declare('sap.proteomicsdb.ui.projects.experimentalDesign.control.treatment.TreatmentSelect');

jQuery.sap.require('sap.proteomicsdb.ui.projects.experimentalDesign.control.Utils');

sap.ui.core.Control.extend('sap.proteomicsdb.ui.projects.experimentalDesign.control.treatment.TreatmentSelect', {
    metadata: {
        properties: {
            treatmentType: 'string',
            inHeader: {
                type: 'boolean',
                defaultValue: true
            }
        }
    },
    renderer: function renderer(oRm, oTreatmentSelect) {
        oRm.write('<div');
        oRm.writeControlData(oTreatmentSelect);
        oRm.addClass('sapProteomicsdbTreatmentSelect');
        oRm.writeClasses();
        oRm.write('>');

        var oMetaData = sap.proteomicsdb.ui.projects.experimentalDesign.control.Utils.TreatmentTypeDictionary[oTreatmentSelect.getTreatmentType()];

        oTreatmentSelect._typeInput = new sap.ui.commons.DropdownBox({
            selectedKey: '{id}',
            textAlign: sap.ui.core.TextAlign.Center,
            items: sap.proteomicsdb.ui.projects.experimentalDesign.control.Utils.getTreatmentTypes(oTreatmentSelect.getTreatmentType() === ''),
            editable: oTreatmentSelect._editMode,
            tooltip: oMetaData ? oMetaData.description : '',
            change: function change(oControlEvent) {
                oTreatmentSelect.setTreatmentType(oControlEvent.getParameters().selectedItem.getKey());
                if (oTreatmentSelect.getInHeader()) {
                    oTreatmentSelect.updateTreatmentModel();
                }
            }
        }).addStyleClass('sapProteomicsdbTreatmentSelectComboBox');
        oTreatmentSelect._typeInput.setParent(oTreatmentSelect);

        oRm.renderControl(oTreatmentSelect._typeInput);

        oRm.write('</div>');
    },

    onAfterRendering: function onAfterRendering() {
        this.bindProperty('treatmentType', 'id');
    },

    updateTreatmentModel: function updateTreatmentModel() {
        var aConditions = this.getModel().getData().conditions;
        var sPath = this.getBindingContext().sPath;

        var aFactors = sap.proteomicsdb.ui.projects.experimentalDesign.control.Utils.TreatmentTypeDictionary[this.getTreatmentType()].factors;
        var oTreatment = {};
        for (var j = 0; j < aFactors.length; j++) {
            oTreatment[aFactors[j].id] = {
                value: '',
                unitId: ''
            };
        }

        this._header.getParent().aTreatmentsTemplate[sPath.slice(-1)] = oTreatment;

        this.getModel().getProperty(sPath).parameters = jQuery.extend(true, {}, oTreatment);
        for (var i = 0; i < aConditions.length; i++) {
            aConditions[i].treatments[sPath.slice(-1)] = jQuery.extend(true, {}, oTreatment);
        }
        this._header.getParent().rerender();
    }
});
