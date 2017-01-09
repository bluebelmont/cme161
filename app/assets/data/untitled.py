import scipy.io as sio
import numpy as np


def main(argv):
    filenameArray = arg
    for filename in filenameArray:
        mat_contents = sio.loadmat(filename)
        X = mat_contents['X']
        y = mat_contents['y']
        spikes = mat_contents['spikes']

if __name__ == "__main__":
    main(sys.argv[1:])