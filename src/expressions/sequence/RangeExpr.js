/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cRangeExpr(oLeft, oRight) {
	this.left	= oLeft;
	this.right	= oRight;
};

cRangeExpr.prototype.left	= null;
cRangeExpr.prototype.right	= null;

// Static members
cRangeExpr.parse	= function (oLexer, oStaticContext) {
	var oExpr,
		oRight;
	if (oLexer.eof() ||!(oExpr = cAdditiveExpr.parse(oLexer, oStaticContext)))
		return;
	if (oLexer.peek() != "to")
		return oExpr;

	// Range expression
	oLexer.next();
	if (oLexer.eof() ||!(oRight = cAdditiveExpr.parse(oLexer, oStaticContext)))
		throw new cXPath2Error("XPST0003"
//->Debug
				, "Expected right operand in range expression"
//<-Debug
		);
	return new cRangeExpr(oExpr, oRight);
};

// Public members
cRangeExpr.prototype.evaluate	= function (oContext) {
	return hXPath2StaticContext_operators["to"].call(oContext, this.left.evaluate(oContext), this.right.evaluate(oContext));
};