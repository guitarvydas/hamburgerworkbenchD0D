grammar=../grammar/djson.ohm
prep=~/.local/tools/prep
format=djson.fmt
src=../testbench.json
target=`basename ${src} .json`
here=`pwd`

src2=../testbench2.json
target2=`basename ${src2} .json`

xg=ASCxform
xfmt1=../json2xform/xdjson.fmt
xfmt2=../json2xform/xdjson2.fmt

dev:
	cp ${src} .
	${prep} "." '$$' ${grammar} ${xfmt1} --stop=1 --fmt=${here}/fmt.js --grammarname=${xg} --erroview <${src} >${target}-1.json
	${prep} "." '$$' ${grammar} ${xfmt2} --stop=1 --fmt=${here}/fmt.js --grammarname=${xg} --erroview <${target}-1.json >${target}-2.json
	${prep} "." '$$' ${grammar} ${format} --stop=1 --fmt=${here}/fmt.js --grammarname=ASC2py --errorview <${target}-2.json >${target}.js
#  	cat ${target}.js

dev2:
	cp ${src2} .
	${prep} "." '$$' ${grammar} ${xfmt1} --stop=1 --fmt=${here}/fmt.js --grammarname=${xg} --erroview <${src2} >${target2}-1.json
	${prep} "." '$$' ${grammar} ${xfmt2} --stop=1 --fmt=${here}/fmt.js --grammarname=${xg} --erroview <${target2}-1.json >${target2}-2.json
	${prep} "." '$$' ${grammar} ${format} --stop=1 --fmt=${here}/fmt.js --grammarname=ASC2py --errorview <${target2}-2.json >${target2}.js
