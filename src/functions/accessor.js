/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

/*
	2 Accessors
		node-name
		nilled
		string
		data
		base-uri
		document-uri

*/

// fn:node-name($arg as node()?) as xs:QName?
fStaticContext_defineSystemFunction("node-name",		[[cXTNode, '?']],	function(oNode) {
	if (oNode != null) {
		var fGetProperty	= this.DOMAdapter.getProperty;
		switch (fGetProperty(oNode, "nodeType")) {
			case 1:		// ELEMENT_NAME
			case 2:		// ATTRIBUTE_NODE
				return new cXSQName(fGetProperty(oNode, "prefix"), fGetProperty(oNode, "localName"), fGetProperty(oNode, "namespaceURI"));
			case 5:		// ENTITY_REFERENCE_NODE
				throw "Not implemented";
			case 6:		// ENTITY_NODE
				throw "Not implemented";
			case 7:		// PROCESSING_INSTRUCTION_NODE
				return new cXSQName(null, fGetProperty(oNode, "target"), null);
			case 10:	// DOCUMENT_TYPE_NODE
				return new cXSQName(null, fGetProperty(oNode, "name"), null);
		}
	}
	//
	return null;
});

// fn:nilled($arg as node()?) as xs:boolean?
fStaticContext_defineSystemFunction("nilled",	[[cXTNode, '?']],	function(oNode) {
	if (oNode != null) {
		if (this.DOMAdapter.getProperty(oNode, "nodeType") == 1)
			return new cXSBoolean(false);	// TODO: Determine if node is nilled
	}
	//
	return null;
});

// fn:string() as xs:string
// fn:string($arg as item()?) as xs:string
fStaticContext_defineSystemFunction("string",	[[cXTItem, '?', true]],	function(/*[*/oItem/*]*/) {
	if (!arguments.length) {
		if (!this.item)
			throw new cException("XPDY0002");
		oItem	= this.item;
	}
	return oItem == null ? new cXSString('') : cXSString.cast(fFunction_sequence_atomize([oItem], this)[0]);
});

// fn:data($arg as item()*) as xs:anyAtomicType*
fStaticContext_defineSystemFunction("data",	[[cXTItem, '*']],		function(oSequence1) {
	return fFunction_sequence_atomize(oSequence1, this);
});

// fn:base-uri() as xs:anyURI?
// fn:base-uri($arg as node()?) as xs:anyURI?
fStaticContext_defineSystemFunction("base-uri",	[[cXTNode, '?', true]],	function(oNode) {
	if (!arguments.length) {
		if (!this.DOMAdapter.isNode(this.item))
			throw new cException("XPTY0004"
//->Debug
					, "base-uri() function called when the context item is not a node"
//<-Debug
			);
		oNode	= this.item;
	}
	//
	return cXSAnyURI.cast(new cXSString(this.DOMAdapter.getProperty(oNode, "baseURI") || ''));
});

// fn:document-uri($arg as node()?) as xs:anyURI?
fStaticContext_defineSystemFunction("document-uri",	[[cXTNode, '?']],	function(oNode) {
	if (oNode != null) {
		var fGetProperty	= this.DOMAdapter.getProperty;
		if (fGetProperty(oNode, "nodeType") == 9)
			return cXSAnyURI.cast(new cXSString(fGetProperty(oNode, "documentURI") || ''));
	}
	//
	return null;
});