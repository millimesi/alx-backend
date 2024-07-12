#!/usr/bin/env python3
""" Backend - pagination """
import csv
import math
from typing import List, Tuple, Dict, Any


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    '''
    Based on the given parameters gives the start and the end pages.

    Args:
        page (int): 1-indexed current page number.
        page_size (int): 0-indexed size of the page index.

    Returns:
        Tuple[int, int]: the start index and the end index of the page
    '''
    end_index = page_size * page
    start_index = page_size * (page - 1)

    return (start_index, end_index)


class Server:
    """
    Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        '''
        Gives the approprate pages of the data set,
        based on the given page number

        Args:
            page (int): 1-indexed current page number.
            page_size (int): 0-indexed size of the page index.

        Returns:
            : the start index and the end index of the page
        '''
        # verify if the parameters are integers grater than zero
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        # Get the dataset
        dataset = self.dataset()

        # calculate the dataset range
        dataset_range = len(dataset)

        # calculate the requested page end
        page_request = page * page_size

        # check if the requested page is in range of the dataset
        # if not return empty list
        if dataset_range < page_request:
            return []

        # find the start index and end index of the page
        # using index_range function
        # index_range function is defined in this module
        # it retuns tuple of the start and end index
        start_index, end_index = index_range(page, page_size)

        # get the page
        page = dataset[start_index:end_index]

        # return the page
        return page

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        '''
        Gives the approprate pages of the data set,
        based on the given page number

        Args:
            page (int): 1-indexed current page number.
            page_size (int): 0-indexed size of the page index.

        Returns:
            Dict[str, Any]: the start index and the end index of the page
        '''
        # Get the the total dataset from the dataset method
        dataset = self.dataset()
        total_page = len(dataset)

        return {
            "page_size": page_size,  # Page data size
            "page": page,  # page number
            "data": self.get_page(page, page_size),  # Page data size
            "next_page": page + 1 if page < total_page else None,  # next page
            "prev_page": page - 1 if page > 1 else None,  # The previous number
            "total_pages": math.ceil(total_page / page_size)  # total page num
        }
