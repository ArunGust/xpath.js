/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDayTimeDuration(nDay, nHours, nMinutes, nSeconds, bNegative) {
	cXSDuration.call(this, 0, 0, nDay, nHours, nMinutes, nSeconds, bNegative);
};

cXSDayTimeDuration.RegExp	= /^(-)?P(?:([0-9]+)D)?(?:T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:((?:(?:[0-9]+(?:.[0-9]*)?)|(?:.[0-9]+)))S)?)?$/;

cXSDayTimeDuration.prototype	= new cXSDuration;

cXSDayTimeDuration.prototype.toString	= function() {
	return (this.negative ? '-' : '') + 'P'
			+ (fXSDuration_getDayTimeComponent(this) || 'T0S');
};

cXSDayTimeDuration.cast	= function(vValue) {
	var cType	= cXSAnyAtomicType.typeOf(vValue);
	switch (cType) {
		case cXSDayTimeDuration:
			return vValue;
		case cXSUntypedAtomic:
			vValue	= vValue.toString();
		case cXSString:
			var aMatch	= fString_trim.call(vValue).match(cXSDayTimeDuration.RegExp);
			if (aMatch)
				return fXSDayTimeDuration_normalize(new cXSDayTimeDuration(+aMatch[2] || 0, +aMatch[3] || 0, +aMatch[4] || 0, +aMatch[5] || 0, aMatch[1] == '-'));
			throw new cXPath2Error("FORG0001");
		case cXSDuration:
			return new cXSDayTimeDuration(vValue.day, vValue.hours, vValue.minutes, vValue.seconds, vValue.negative);
		case cXSYearMonthDuration:
			return new cXSDayTimeDuration(0, 0, 0, 0);

	}
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Casting from " + cType + " to xs:dayTimeDuration can never succeed"
//<-Debug
	);
};

// Utilities
function fXSDayTimeDuration_normalize(oDuration) {
	if (oDuration.seconds >= 60) {
		oDuration.minutes	+= ~~(oDuration.seconds / 60);
		oDuration.seconds	%= 60;
	}
	if (oDuration.minutes >= 60) {
		oDuration.hours		+= ~~(oDuration.minutes / 60);
		oDuration.minutes	%= 60;
	}
	if (oDuration.hours >= 24) {
		oDuration.day		+= ~~(oDuration.hours / 24);
		oDuration.hours		%= 24;
	}
	return oDuration;
};

//
fXPath2StaticContext_defineSystemDataType("dayTimeDuration",	cXSDayTimeDuration);