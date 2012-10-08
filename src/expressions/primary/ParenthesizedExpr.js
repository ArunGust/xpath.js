/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cParenthesizedExpr(oExpr) {
	this.expression	= oExpr;
};

// Static members
cParenthesizedExpr.parse	= function (oLexer) {
	var oExpr;
	if (oLexer.peek() == '(') {
		oLexer.next();
		// Check if not empty (allowed)
		if (oLexer.peek() == ')')
			oExpr	= null;
		else
			oExpr	= cExpr.parse(oLexer);
		//
		if (oLexer.peek() == ')') {
			oLexer.next();
		}
		else
			throw "ParenthesizedExpr.parse: expected ')' token not found";
		//
		return new cParenthesizedExpr(oExpr);
	}
	else
		throw "Not ParenthesizedExpr";
};

// Public members
cParenthesizedExpr.prototype.evaluate	= function (oContext) {
	return this.expression.evaluate(oContext);
};