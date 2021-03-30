jQuery.sap.declare('sap.proteomicsdb.ui.projects.experimentalDesign.control.treatment.Treatment');

jQuery.sap.require('sap.proteomicsdb.ui.projects.experimentalDesign.control.Utils');

sap.ui.core.Control.extend('sap.proteomicsdb.ui.projects.experimentalDesign.control.treatment.Treatment', {
    metadata: {
        properties: {
            treatmentType: 'string',
            isHeader: {
                type: 'boolean',
                defaultValue: false
            }
        }
    },
    renderer: function renderer(oRm, oTreatment) {
        oRm.write('<div');
        oRm.writeControlData(oTreatment);
        oRm.addClass('sapProteomicsdbTreatment');
        oRm.writeClasses();
        oRm.write('>');

        var nTreatmentId = oTreatment.getTreatmentType();
        var oMetaData = sap.proteomicsdb.ui.projects.experimentalDesign.control.Utils.TreatmentTypeDictionary[nTreatmentId];
        if (oMetaData !== undefined) {
            for (var i = 0; i < oMetaData.factors.length; i++) {
                var oFactor = oMetaData.factors[i];
                var sBindingPath = oTreatment.sConditionPath ? oTreatment.sConditionPath + '/' + oFactor.id : oTreatment.getBindingContext().sPath + '/' + oFactor.id;

                oRm.write('<div');
                oRm.writeControlData(oTreatment);
                oRm.addClass('sapProteomicsdbTreatmentFactor');
                oRm.writeClasses();
                oRm.write('>');

                if (oFactor.type === 'cv') {
                    var oInput = new sap.ui.commons.ComboBox({
                        placeholder: oFactor.name,
                        value: '{value}',
                        textAlign: sap.ui.core.TextAlign.Center,
                        editable: oTreatment._editMode,
                        tooltip: {
                            path: 'value',
                            formatter: function formatter(sValue) {
                                return this.data('description') + ':\n' + sValue;
                            }
                        },
                        change: function change(oEvent) {
                            var oItem = oEvent.getParameters().selectedItem;
                            var aPathElements = this.getBindingContext().sPath.split('/');
                            //  get Parentelement of the CV - used to override CV without exiting model context
                            var oFactor = this.getModel().getData().conditions[aPathElements[2]].treatments[aPathElements[4]];
                            var nId = oFactor[aPathElements[5]].id;
                            if (oItem !== null) { //  copy controlled vocabulary information into model
                                var oCV = this.getModel('treatmentTypes').getProperty(oItem.getBindingContext('treatmentTypes').sPath);
                                oFactor[aPathElements[5]] = jQuery.extend(true, {}, oCV);
                                oFactor[aPathElements[5]].id = nId;
                            } else if (oEvent.getParameters().newValue !== '') { //  create new controlled vocabulary object, preserve id
                                oFactor[aPathElements[5]] = {
                                    id: nId,
                                    value: oEvent.getParameters().newValue,
                                    cvId: '',
                                    unitId: ''
                                };
                                this.getModel().updateBindings();
                                this.getParent().getParent().getParent().openCVModal(this.getBindingContext().sPath, this.data('FactorPath'), this);
                            }
                        }
                    }).setParent(oTreatment).addStyleClass('sapProteomicsdbTreatmentText').data('description', oFactor.description);
                    oInput.data('FactorPath', '/' + nTreatmentId + '/factors/' + i);
                    oInput.bindElement(sBindingPath);

                    oInput.bindAggregation('items', {
                        path: 'treatmentTypes>/' + nTreatmentId + '/factors/' + i + '/parameters',
                        template: new sap.ui.core.ListItem({
                            text: '{treatmentTypes>value}',
                            key: '{treatmentTypes>cvId}',
                            additionalText: '{treatmentTypes>unitId}',
                            tooltip: '{treatmentTypes>description}'
                        })
                    });

                    oRm.renderControl(oInput);
                } else {
                    var oInput = new sap.ui.commons.TextField({
                        placeholder: oFactor.name,
                        width: '50%',
                        value: '{value}',
                        textAlign: sap.ui.core.TextAlign.Center,
                        editable: oTreatment._editMode,
                        tooltip: oFactor.description,
                        change: function change(oEvent) {
                            var sNewValue = oEvent.getParameters().newValue;
                            if (parseFloat(sNewValue) >= 0) {
                                this.setValue(parseFloat(sNewValue));
                            } else {
                                this.setValue('');
                            }
                        }
                    }).setParent(oTreatment).addStyleClass('sapProteomicsdbTreatmentNumber');
                    oInput.bindElement(sBindingPath);

                    oRm.renderControl(oInput);

                    var oInput = new sap.ui.commons.DropdownBox({
                        width: '50%',
                        placeholder: 'unit',
                        selectedKey: '{unitId}',
                        textAlign: sap.ui.core.TextAlign.Center,
                        editable: oTreatment._editMode
                    }).setParent(oTreatment).addStyleClass('sapProteomicsdbTreatmentUnit');
                    oInput.bindElement(sBindingPath);
                    for (var j = 0; j < oFactor.parameters.length; j++) {
                        oInput.addItem(new sap.ui.core.ListItem({
                            text: oFactor.parameters[j].unit,
                            key: oFactor.parameters[j].unitId
                        }));
                    }

                    oRm.renderControl(oInput);
                }
                oRm.write('</div>');
            } // FOR
        } // IF
        oRm.write('</div>'); //  sapProteomicsdbTreatment
    },
    onAfterRendering: function onAfterRendering() {}
});
