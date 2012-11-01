/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDecimal() {

};

cXSDecimal.RegExp	= /^[+\-]?((\d+(\.\d*)?)|(\.\d+))$/;

cXSDecimal.prototype	= new cXSAnyAtomicType;

//
cFunctionCall.dataTypes["decimal"]	= function(sValue) {
	var aMatch	= sValue.match(cXSDecimal.RegExp);
	if (aMatch)
		return +sValue;
	throw new cXPath2Error("FORG0001");
};