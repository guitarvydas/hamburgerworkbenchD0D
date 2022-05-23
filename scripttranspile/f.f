machine foreach
code  {
var files;
}
state idle {

on begin {
files = fs.readdirSync ("${s}");this.next ('generating');
} 
}
code generating {

      if (0 === files.length) {
        this.next ('idle');
      } else {
        var newenv = env.cons ({f: file.unshift ()}, env);
        this.send (env, newenv);
        this.send (kick, true);
      }
    this.next ('blocked');
}
state blocked {

on resume {
this.next ('generating');
} 
}
