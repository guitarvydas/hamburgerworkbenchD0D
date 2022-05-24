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
	${prep} '```' '```' verbatim3.ohm verbatim.fmt ${support} --inclusive <foreach.hsm

verbatim1: send.ohm send.fmt fmt.js foreach.hsm
	${prep} '`' '`' verbatim1.ohm verbatim.fmt ${support} --inclusive <foreach.hsm

send: send.ohm send.fmt fmt.js foreach.hsm
	${prep} '⇑' '\n' send.ohm send.fmt ${support} <foreach.hsm

next: next.ohm next.fmt fmt.js foreach.hsm
	${prep} '☞' '\n' next.ohm next.fmt ${support} <foreach.hsm

foreach: foreach.mdsm send.ohm send.fmt next.ohm next.fmt
	cat foreach.mdsm \
	| ${prep} '```' '```' verbatim3.ohm verbatim.fmt --inclusive ${support} \
	| ${prep} '`' '`' verbatim1.ohm verbatim.fmt --inclusive ${support} \
	| ${prep} '⇑' '\n' send.ohm send.fmt ${support} \
	| ${prep} '☞' '\n' next.ohm next.fmt ${support} \
	| ${prep} '.' '$$' mdhsm.ohm mdhsm.fmt ${support} --stop=1 --errorview \
	| tee f.5 \
	| ${prep} '.' '$$' hsm.ohm hsm.fmt ${support} --stop=1 --errorview \
	| tee f.6 \
	| cat -

