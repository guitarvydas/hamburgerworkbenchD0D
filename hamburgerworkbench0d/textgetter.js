function handler_textGetter (me, message) {
    me.send ("long phrase", "I Want A Hamburger With Ketchup And Bacon And Pickles");
}

var TextGetter_signature = {
    name: "Text Getter",
    inputs: [{name: "go", structure: []}],
    outputs: [{ name: "phrase", structure: [] }]
};

let TextGetter_protoImplementation = {
    name: "Text Getter",
    kind: "leaf",
    handler: handler_textGetter,
    begin: function () {},
    finish: function () {}
};

function TextGetter (container, instancename) {
    let me = new Leaf (signature, TextGetter_protoImplementation, container, instancename);
    return me;
}
    
    
