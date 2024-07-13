#!/usr/bin/python3
""" Caching project file
"""


from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ Basic caching system """
    def __init__(self):
        ''' Initialize '''
        super().__init__()

    def put(self, key, item):
        """
        Assign the key and the item to the cache_data

        Args:
            key: key for the cache data
            item: value for the cache data key
        """
        # if both key and item are not None assign the value to the cache data
        if key is not None and item is not None:

            # If the cached data is full discard the fisrt element
            if ((len(self.cache_data) >= BaseCaching.MAX_ITEMS)
                    and not (key in self.cache_data)):

                # Get the first in element
                first_key = next(iter(self.cache_data))

                # Delete the first element from cached data
                del self.cache_data[first_key]
                print(f"DISCARD: {first_key}")

            self.cache_data[key] = item

    def get(self, key):
        """
        Gives the cache value from the data

        Args:
            Key: the key for the cache value

        Returns:
            The cache value for the key
        """
        # get the value of the key is it not none or exists
        return self.cache_data.get(key) if key is not None else None
