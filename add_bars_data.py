
def load_new_data():

	suffix = '||'

	with open('seed_data.txt', 'r') as src:
	    with open('data_test.txt', 'w') as dest:
	       for line in src:
	           dest.write('%s%s\n' % (line.rstrip('\n'), suffix))


load_new_data() 




