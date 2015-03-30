ROOT=$(shell pwd)

test: test-unit test-integration

test-unit:
	@echo Running tests...
	@NODE_ENV=test mocha --globals testRule
	
test-integration:
	@echo Running integration tests...
	mkdir test_integration
	cd test_integration; \
		wget https://github.com/balderdashy/waterline/archive/master.zip; \
		unzip -q master.zip
	cd test_integration/waterline-master; \
		npm install; \
		rm -rf node_modules/anchor; \
		ln -s $(ROOT) node_modules/anchor; \
		npm test
	rm -rf test_integration
