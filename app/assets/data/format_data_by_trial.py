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
		left_fr = mat_contents_left['lowDXleft']
		right_fr = mat_contents_right['lowDXright']
		left_cursor = mat_contents_left['cursorPositionsLeft']
		right_cursor = mat_contents_right['cursorPositionsRight']

		num_left_trials, T, dim = np.shape(left_fr)
		num_right_trials, _, _ = np.shape(right_fr)
		d = {}
		all_trial_dict = {}
		for trial in range(num_left_trials): 
			trial_dict = {}
			all_time_dict = {}
			beginning_nancount = 0
			end_data = {}
			data_start = False
			for t in range(T):
				x = left_fr[trial, t, 0]
				y = left_fr[trial, t, 1]
				z = left_fr[trial, t, 2]
				c_x = left_cursor[trial, t, 0]
				c_y = left_cursor[trial, t, 1]
				if np.isnan(x) and not data_start:
					beginning_nancount += 1
				elif not np.isnan(x):
					data_start = True
					time_dict = {}
					time_dict['x'] = x
					time_dict['y'] = y
					time_dict['z'] = z
					time_dict['c_x'] = c_x
					time_dict['c_y'] = c_y
					all_time_dict[t] = time_dict
					end_data = all_time_dict[t]
				else:
					all_time_dict[t] = end_data
			for t in range(beginning_nancount):
				all_time_dict[t] = all_time_dict[beginning_nancount]
			trial_dict['direction'] = 'left'
			trial_dict['time'] = all_time_dict
			all_trial_dict[trial] = trial_dict
		for trial in range(num_right_trials): 
			trial_dict = {}
			all_time_dict = {}
			beginning_nancount = 0
			end_data = {}
			data_start = False
			for t in range(T):
				x = right_fr[trial, t, 0]
				y = right_fr[trial, t, 1]
				z = right_fr[trial, t, 2]
				c_x = right_cursor[trial, t, 0]
				c_y = right_cursor[trial, t, 1]
				if np.isnan(x) and not data_start:
					beginning_nancount += 1
				elif not np.isnan(x):
					data_start = True
					time_dict = {}
					time_dict['x'] = x
					time_dict['y'] = y
					time_dict['z'] = z
					time_dict['c_x'] = c_x
					time_dict['c_y'] = c_y
					all_time_dict[t] = time_dict
					end_data = all_time_dict[t]
				else:
					all_time_dict[t] = end_data
			for t in range(beginning_nancount):
				all_time_dict[t] = all_time_dict[beginning_nancount]
			trial_dict['direction'] = 'right'
			trial_dict['time'] = all_time_dict
			all_trial_dict[trial + num_left_trials] = trial_dict
		d['trial'] = all_trial_dict
		d['start'] = int(mat_contents_left['startTimeBeforeJump'][0][0])
		d['end'] = int(mat_contents_left['endTimeAfterJump'][0][0])
		with open(conditions[cond] + 'data.json', 'w') as outfile:
			json.dump(d, outfile, sort_keys=True, indent=4)


	

if __name__ == "__main__":
	main()