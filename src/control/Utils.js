
var Utils = {};

Utils.TreatmentTypeDictionary = {};

Utils.createTreatmentTypeDictionary = function createTreatmentTypeDictionary(aTreatments) {
    for (var i = 0; i < aTreatments.length; i++) {
        Utils.TreatmentTypeDictionary[aTreatments[i].id] = aTreatments[i];
    }
    return Utils.TreatmentTypeDictionary;
};
/*
Utils.createTreatmentType = function createTreatmentType(nTreatment, oModel, bEditMode, sConditionPath) {
    var oTreatmentData = oModel.treatments[nTreatment];
    var oTreatment = new treatment.Treatment({
        treatmentType: oTreatmentData.id
    });
    oTreatment.setModel(oModel);
    oTreatment.bindElement('/treatments/' + nTreatment + '/parameters');
    oTreatment._editMode = bEditMode;

    if (sConditionPath !== undefined) {
        oTreatment.sConditionPath = sConditionPath + '/treatments/' + nTreatment;
    }

    return oTreatment;
};*/

Utils.getTreatmentTypes = function getTreatmentTypes(bIncludeBlank) {
    var aTreatmentItems = [];

    if (bIncludeBlank) {
        aTreatmentItems.push({
            text: 'Select Treatment',
            key: -1
        });
    }

    for (var id in Utils.TreatmentTypeDictionary) {
        var oTreatment = Utils.TreatmentTypeDictionary[id];
        aTreatmentItems.push({
            text: oTreatment.name,
            key: id,
            tooltip: oTreatment.description
        });
    }

    return aTreatmentItems;
};

Utils.removeArrayElement = function removeArrayElement(aArray, nElement) {
    var aBefore = aArray.slice(0, nElement);
    var aAfter = aArray.slice(nElement + 1, aArray.length);
    return aBefore.concat(aAfter);
};

Utils.designsAreEqual = function designsAreEqual(oOne, oTwo) {
    if (oOne.description !== oTwo.description) {
        return false;
    }
    if (oOne.name !== oTwo.name) {
        return false;
    }
    if (oOne.conditions.length !== oTwo.conditions.length) {
        return false;
    }
    if (oOne.treatments.length !== oTwo.treatments.length) {
        return false;
    }
    if (oOne.samples.length !== oTwo.samples.length) {
        return false;
    }

    //  Conditions
    var oOneCondition; var oTwoCondition;

    var oOneBioRep; var oTwoBioRep;

    var oOneSample; var oTwoSample;

    var oOneTreatment; var oTwoTreatment;

    var nFactor; var nValue;
    for (var i = 0; i < oOne.conditions.length; i++) {
        oOneCondition = oOne.conditions[i];
        oTwoCondition = oTwo.conditions[i];
        if (oOneCondition.control !== oTwoCondition.control) {
            return false;
        }

        //  Bio Rep
        if (oOneCondition.bioRep.length !== oTwoCondition.bioRep.length) {
            return false;
        }
        for (var j = 0; j < oOneCondition.bioRep.length; j++) {
            oOneBioRep = oOneCondition.bioRep[j];
            oTwoBioRep = oTwoCondition.bioRep[j];
            if (oOneBioRep.bioRep !== oTwoBioRep.bioRep) {
                return false;
            }

            //  Bio Rep Samples
            if (oOneBioRep.samples.length !== oTwoBioRep.samples.length) {
                return false;
            }
            for (var k = 0; k < oOneBioRep.samples.length; k++) {
                oOneSample = oOneBioRep.samples[k];
                oTwoSample = oTwoBioRep.samples[k];
                if (oOneSample.description !== oTwoSample.description) {
                    return false;
                }
                if (oOneSample.name !== oTwoSample.name) {
                    return false;
                }
                if (oOneSample.id !== oTwoSample.id) {
                    return false;
                }
            }
        }

        //  Condition Treatments
        if (oOneCondition.treatments.length !== oTwoCondition.treatments.length) {
            return false;
        }
        for (j = 0; j < oOneCondition.treatments.length; j++) {
            oOneTreatment = oOneCondition.treatments[j];
            oTwoTreatment = oTwoCondition.treatments[j];

            //  Experimental Factors
            for (nFactor in oOneTreatment) {
                //  Values
                for (nValue in oOneTreatment[nFactor]) {
                    if (parseFloat(oOneTreatment[nFactor][nValue])) {
                        if (parseFloat(oOneTreatment[nFactor][nValue]) !== parseFloat(oTwoTreatment[nFactor][nValue])) {
                            return false;
                        }
                    } else {
                        if (oOneTreatment[nFactor][nValue] !== oTwoTreatment[nFactor][nValue]) {
                            return false;
                        }
                    }
                }
            }
        }
    }

    // Treatments
    for (i = 0; i < oOne.treatments.length; i++) {
        oOneTreatment = oOne.treatments[i];
        oTwoTreatment = oTwo.treatments[i];
        if (oOneTreatment.id !== oTwoTreatment.id) {
            return false;
        }

        // Experimental Factors
        for (nFactor in oOneTreatment.parameters) {
            // Values
            for (nValue in oOneTreatment[nFactor]) {
                if (oOneTreatment.parameters[nFactor][nValue] !== oTwoTreatment.parameters[nFactor][nValue]) {
                    return false;
                }
            }
        }
    }

    // Samples
    for (i = 0; i < oOne.samples.length; i++) {
        oOneSample = oOne.samples[i];
        oTwoSample = oTwo.samples[i];
        if (oOneSample.id !== oTwoSample.id) {
            return false;
        }
        if (oOneSample.name !== oTwoSample.name) {
            return false;
        }
        if (oOneSample.description !== oTwoSample.description) {
            return false;
        }
    }
    return true;
};

export default Utils
