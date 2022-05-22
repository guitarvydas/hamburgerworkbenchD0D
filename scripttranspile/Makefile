prep=~/.local/tools/prep
cwd=`pwd`
grammar=st.ohm
identity-format=identity-st.fmt
src=../script.js
target=script.js

all: identity

identity:
	${prep} '❮[ \n]*delete' '❯' ${grammar} ${identity-format} ${support} --errorview --inclusive <${src}

