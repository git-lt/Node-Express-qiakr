TESTS = $(shell find test -type f -name "*.test.js")
TEST_TIMEOUT = 10000
MOCHA_REPORTER = spec
NPM_REGISTRY = ""

all: test

install:
	@npm install $(NPM_REGISTRY)

pretest:
	@if ! test -d logs; then \
		mkdir logs; \
	fi

test: 
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(MOCHA_REPORTER) \
		--timeout $(TEST_TIMEOUT) \
		$(TESTS)

test-cov: 
	@NODE_ENV=test node \
		./node_modules/.bin/istanbul cover --preserve-comments \
		./node_modules/.bin/_mocha \
		-- \
		--reporter $(MOCHA_REPORTER) \
		--timeout $(TEST_TIMEOUT) \
		$(TESTS)

run:
	@node app.js

start:
	@NODE_ENV=production ./node_modules/.bin/pm2 start app.js -i 0 --name "qiakr" --max-memory-restart 400M

restart:
	@NODE_ENV=production ./node_modules/.bin/pm2 restart "qiakr"

.PHONY: install test test-cov run start restart


