prep=~/.local/tools/prep
cwd=`pwd`
grammar=st.ohm
identity-format=identity-st.fmt
format=st.fmt
src=../script.js
target=script.js
support=--fmt=${cwd}/fmt.js

all: identity preprocess

identity:
	${prep} '❮' '❯' ${grammar} ${identity-format} ${support} --errorview --inclusive <${src}

preprocess: ${grammar} ${format}  ${support}
	${prep} '❮' '❯' ${grammar} ${format} ${support} --errorview --inclusive <${src} >out.js

verbatim3: send.ohm send.fmt fmt.js foreach.hsm
	${prep} '```' '```' verbatim3.ohm verbatim3.fmt ${support} --inclusive <foreach.hsm

verbatim1: send.ohm send.fmt fmt.js foreach.hsm
	${prep} '`' '`' verbatim1.ohm verbatim3.fmt ${support} --inclusive <foreach.hsm

send: send.ohm send.fmt fmt.js foreach.hsm
	${prep} '⇑' '\n' send.ohm send.fmt ${support} <foreach.hsm

next: next.ohm next.fmt fmt.js foreach.hsm
	${prep} '☞' '\n' next.ohm next.fmt ${support} <foreach.hsm

foreach: foreach.hsm send.ohm send.fmt next.ohm next.fmt
	cat foreach.hsm \
	| ${prep} '```' '```' verbatim3.ohm verbatim3.fmt --inclusive \
	| tee foreach.0 \
	| ${prep} '⇑' '\n' send.ohm send.fmt ${support} \
	| ${prep} '☞' '\n' next.ohm next.fmt ${support} \
	| tee foreach.2 \
	| ${prep} '.' '$$' hsm.ohm hsm.fmt ${support} --stop=1 --errorview
