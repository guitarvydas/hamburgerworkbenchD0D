prep=~/.local/tools/prep
cwd=`pwd`
grammar=st.ohm
identity-format=identity-st.fmt
format=st.fmt
src=../script.js
target=script.js

all: identity preprocess

identity:
	${prep} '❮' '❯' ${grammar} ${identity-format} ${support} --errorview --inclusive <${src}

preprocess:
	${prep} '❮' '❯' ${grammar} ${format} ${support} --errorview --inclusive <${src}

