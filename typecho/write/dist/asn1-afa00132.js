function words(e){for(var t={},n=e.split(" "),r=0;r<n.length;++r)t[n[r]]=!0;return t}const defaults={keywords:words("DEFINITIONS OBJECTS IF DERIVED INFORMATION ACTION REPLY ANY NAMED CHARACTERIZED BEHAVIOUR REGISTERED WITH AS IDENTIFIED CONSTRAINED BY PRESENT BEGIN IMPORTS FROM UNITS SYNTAX MIN-ACCESS MAX-ACCESS MINACCESS MAXACCESS REVISION STATUS DESCRIPTION SEQUENCE SET COMPONENTS OF CHOICE DistinguishedName ENUMERATED SIZE MODULE END INDEX AUGMENTS EXTENSIBILITY IMPLIED EXPORTS"),cmipVerbs:words("ACTIONS ADD GET NOTIFICATIONS REPLACE REMOVE"),compareTypes:words("OPTIONAL DEFAULT MANAGED MODULE-TYPE MODULE_IDENTITY MODULE-COMPLIANCE OBJECT-TYPE OBJECT-IDENTITY OBJECT-COMPLIANCE MODE CONFIRMED CONDITIONAL SUBORDINATE SUPERIOR CLASS TRUE FALSE NULL TEXTUAL-CONVENTION"),status:words("current deprecated mandatory obsolete"),tags:words("APPLICATION AUTOMATIC EXPLICIT IMPLICIT PRIVATE TAGS UNIVERSAL"),storage:words("BOOLEAN INTEGER OBJECT IDENTIFIER BIT OCTET STRING UTCTime InterfaceIndex IANAifType CMIP-Attribute REAL PACKAGE PACKAGES IpAddress PhysAddress NetworkAddress BITS BMPString TimeStamp TimeTicks TruthValue RowStatus DisplayString GeneralString GraphicString IA5String NumericString PrintableString SnmpAdminString TeletexString UTF8String VideotexString VisibleString StringStore ISO646String T61String UniversalString Unsigned32 Integer32 Gauge Gauge32 Counter Counter32 Counter64"),modifier:words("ATTRIBUTE ATTRIBUTES MANDATORY-GROUP MANDATORY-GROUPS GROUP GROUPS ELEMENTS EQUALITY ORDERING SUBSTRINGS DEFINED"),accessTypes:words("not-accessible accessible-for-notify read-only read-create read-write"),multiLineStrings:!0};function asn1(e){var i,r=e.keywords||defaults.keywords,s=e.cmipVerbs||defaults.cmipVerbs,E=e.compareTypes||defaults.compareTypes,o=e.status||defaults.status,I=e.tags||defaults.tags,T=e.storage||defaults.storage,u=e.modifier||defaults.modifier,S=e.accessTypes||defaults.accessTypes,l=e.multiLineStrings||defaults.multiLineStrings,a=!1!==e.indentStatements,d=/[\|\^]/;function A(e,t){var a,n=e.next();if('"'==n||"'"==n)return t.tokenize=(a=n,function(e,t){for(var n,r=!1,i=!1;null!=(n=e.next());){if(n==a&&!r){var s=e.peek();s&&("b"!=(s=s.toLowerCase())&&"h"!=s&&"o"!=s||e.next()),i=!0;break}r=!r&&"\\"==n}return!i&&(r||l)||(t.tokenize=null),"string"}),t.tokenize(e,t);if(/[\[\]\(\){}:=,;]/.test(n))return i=n,"punctuation";if("-"==n&&e.eat("-"))return e.skipToEnd(),"comment";if(/\d/.test(n))return e.eatWhile(/[\w\.]/),"number";if(d.test(n))return e.eatWhile(d),"operator";e.eatWhile(/[\w\-]/);e=e.current();return r.propertyIsEnumerable(e)?"keyword":s.propertyIsEnumerable(e)?"variableName":E.propertyIsEnumerable(e)?"atom":o.propertyIsEnumerable(e)?"comment":I.propertyIsEnumerable(e)?"typeName":T.propertyIsEnumerable(e)||u.propertyIsEnumerable(e)||S.propertyIsEnumerable(e)?"modifier":"variableName"}function N(e,t,n,r,i){this.indented=e,this.column=t,this.type=n,this.align=r,this.prev=i}function p(e,t,n){var r=e.indented;return e.context&&"statement"==e.context.type&&(r=e.context.indented),e.context=new N(r,t,n,null,e.context)}function O(e){var t=e.context.type;return")"!=t&&"]"!=t&&"}"!=t||(e.indented=e.context.indented),e.context=e.context.prev}return{startState:function(){return{tokenize:null,context:new N(-2,0,"top",!1),indented:0,startOfLine:!0}},token:function(e,t){var n=t.context;if(e.sol()&&(null==n.align&&(n.align=!1),t.indented=e.indentation(),t.startOfLine=!0),e.eatSpace())return null;i=null;var r=(t.tokenize||A)(e,t);if("comment"==r)return r;if(null==n.align&&(n.align=!0),";"!=i&&":"!=i&&","!=i||"statement"!=n.type)if("{"==i)p(t,e.column(),"}");else if("["==i)p(t,e.column(),"]");else if("("==i)p(t,e.column(),")");else if("}"==i){for(;"statement"==n.type;)n=O(t);for("}"==n.type&&(n=O(t));"statement"==n.type;)n=O(t)}else i==n.type?O(t):a&&(("}"==n.type||"top"==n.type)&&";"!=i||"statement"==n.type&&"newstatement"==i)&&p(t,e.column(),"statement");else O(t);return t.startOfLine=!1,r},languageData:{indentOnInput:/^\s*[{}]$/,commentTokens:{line:"--"}}}}export{asn1};