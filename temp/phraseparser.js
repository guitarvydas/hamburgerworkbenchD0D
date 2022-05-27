const grammar = String.raw`
hamburger {
Main = Phrase+

Phrase =
  | "I" "Want" "A" "Hamburger" "With" Choice* -- longphrase
  | "I" "Want" "A" "Cheeseburger"             -- shortphrase
  
Choice = "And"? (Condiment | Extra)
  
Condiment =
 | "Mustard"         -- mustard
 | "Ketchup"         -- ketchup
 | "Pickles"         -- pickles
 | "Special" "Sauce" -- specialsauce
 
Extra =
 | "Cheese"          -- cheese
 | "Bacon"           -- bacon
 
}
`;

function foldChoices (a) {
    let condiments = [];
    let extras = [];
    a.forEach (choiceObj => {
        choiceObj.condiments [0] && condiments.push (choiceObj.condiments [0]);
        choiceObj.extras [0] && extras.push (choiceObj.extras [0]);
    });
    return {condiments: condiments, extras: extras};
}

let hamburger_hooks = {
    Main: function (p) { return p.hamburger (); },
    Phrase_longphrase: function (sI, sWant, sA, sHamburger, sWith, choiceArray) {
        
        let c = foldChoices (choiceArray.hamburger ());
        c.long = true;
	c.item = "hamburger";
        return c;
    },
    Phrase_shortphrase: function (sI, sWant, sA, sCheeseburger) {
        return { item: "cheeseburger", condiments: [], extras: [], short: true};
    },
    Choice: function (optAnd, ch) {
        return ch.hamburger ();
    },
    Condiment_ketchup: function (c) {
        return { condiments: ["ketchup"],  extras: [] };
    },
    Condiment_mustard: function (c) {
        return { condiments: ["mustard"],  extras: [] };
    },
    Condiment_pickles: function (c) {
        return { condiments: ["pickles"],  extras: [] };
    },
    Condiment_specialsauce: function (c1, c2) {
        return { condiments: ["special sauce"],  extras: [] };
    },
    Extra_cheese: function (_) {
        return { condiments: [],  extras: ["cheese"] };
    },
    Extra_bacon: function (_) {
        return { condiments: [],  extras: ["bacon"] };
    },
    _terminal: function () {
        return { content: this.sourceString};
    },
    _iter: function (...children) { 
        let arr = children.map(c => {
            return c.hamburger ()
        }); 
        return arr;
    }
};

function parsePhrase (me, phrase) {
    let g = ohm.grammar (grammar);
    let matchResult = g.match (phrase);
    if (matchResult.succeeded ()) {
        let s = g.createSemantics ();
        return [matchResult, s];
    } else {
        me.send ("parse error", {item: "parse error", extras: "error", condiments: "error"});
        let dontcare = null;
        return [ matchResult, dontcare ];
    }
}

function transpileHamburgerOrder (me, phrase) {
    var [cst, hookMap] = parsePhrase (me, phrase);      
    if (cst.succeeded ()) {
        hookMap.addOperation ('hamburger', hamburger_hooks);
        let treeWalker = hookMap (cst);
        let order = treeWalker.hamburger ();
        return order [0];
    } else {
        me.send ("hook error", {item: "hook error", extras: "error", condiments: "error"});
	return "hook error";
    }
}
function handler_phraseParser (me, message) {
    let order = transpileHamburgerOrder (me, message.data);
    if (order.short) {
        me.send ("order no choices", order);
    } else if (order.long) {
        me.send ("order with choices", order);
    } else {
        me.send ("hook error", {item: "internal error: order does not contain short nor long attribute", extras: "error", condiments: "error"});
    }
}

var Phrase_Parser_signature = {
    name: "Phrase Parser",
    inputs: [{name: "phrase", structure: ["phrase"]}],
    outputs: [
        { name: "order no choices", structure: [] },
        { name: "order with choices", structure: ["condiments", "extras"] },
        { name: "parse error", structure: [] }, // NC for this simplified example
        { name: "hook error", structure: [] }   // NC for this simplified example
    ]
};

let Phrase_Parser_protoImplementation = {
    name: "Phrase Parser",
    kind: "leaf",
    handler: handler_phraseParser,
    begin: function () {},
    finish: function () {}
};

function Phrase_Parser (container, instancename) {
    let me = new Leaf (signature, PhraseParser_protoImplementation, container, instancename);
    return me;
}

    
    
