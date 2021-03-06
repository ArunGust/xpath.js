/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSNonPositiveInteger(nValue) {
	this.value	= nValue;
};

cXSNonPositiveInteger.prototype	= new cXSInteger;
cXSNonPositiveInteger.prototype.builtInKind	= cXSConstants.NONPOSITIVEINTEGER_DT;

cXSNonPositiveInteger.cast	= function(vValue) {
	var oValue;
	try {
		oValue	= cXSInteger.cast(vValue);
	}
	catch (oError) {
		throw oError;
	}
	// facet validation
	if (oValue.value <= 0)
		return new cXSNonPositiveInteger(oValue.value);
	//
	throw new cException("FORG0001");
};

//
fStaticContext_defineSystemDataType("nonPositiveInteger",	cXSNonPositiveInteger);
