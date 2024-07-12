#!/usr/bin/env python3
""" Backend - pagination """
from typing import Tuple


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
