import json
import scipy.io as sio
import numpy as np

def main():
	conditions = ['30', '60', '100', 'Hold']
	for cond in range(len(conditions)):
		left_filename = 'jumpAt' + conditions[cond] + 'left.mat'
		right_filename = 'jumpAt' + conditions[cond] + 'right.mat'
		mat_contents_left = sio.loadmat(left_filename)
		mat_contents_right = sio.loadmat(right_filename)
		left = mat_contents_left['lowDXleft']
		right = mat_contents_right['lowDXright']

		num_left_trials, T, dim = np.shape(left)
		num_right_trials, _, _ = np.shape(right)
		d = {}
		all_trial_dict = {}
		for trial in range(num_left_trials): 
			trial_dict = {}
			all_time_dict = {}
			for t in range(T):
				x = left[trial, t, 0]
				y = left[trial, t, 1]
				z = left[trial, t, 2]
				if not np.isnan(x):
					time_dict = {}
					time_dict['x'] = x
					time_dict['y'] = y
					time_dict['z'] = z
					all_time_dict[t] = time_dict
			trial_dict['direction'] = 'left'
			trial_dict['time'] = all_time_dict
			all_trial_dict[trial] = trial_dict
		for trial in range(num_right_trials): 
			trial_dict = {}
			all_time_dict = {}
			for t in range(T):
				x = right[trial, t, 0]
				y = right[trial, t, 1]
				z = right[trial, t, 2]
				if not np.isnan(x):
					time_dict = {}
					time_dict['x'] = x
					time_dict['y'] = y
					time_dict['z'] = z
					all_time_dict[t] = time_dict
			trial_dict['direction'] = 'right'
			trial_dict['time'] = all_time_dict
			all_trial_dict[trial + num_left_trials] = trial_dict

		d['trial'] = all_trial_dict
		with open(conditions[cond] + 'data.json', 'w') as outfile:
			json.dump(d, outfile, sort_keys=True, indent=4)


	

if __name__ == "__main__":
	main()