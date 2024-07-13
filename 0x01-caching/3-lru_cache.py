#!/usr/bin/python3
""" Caching project file
"""


from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """ Basic caching system """
    def __init__(self):
        ''' Initialize '''
        super().__init__()
        self.use_order = []

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

                # Get last in element
                # Delete the last element from cached data
                lru_key = self.use_order.pop(0)
                del self.cache_data[lru_key]
                print(f"DISCARD: {lru_key}")

            self.cache_data[key] = item

            # Update the use order list
            if key in self.use_order:
                self.use_order.remove(key)
            self.use_order.append(key)

    def get(self, key):
        """
        Gives the cache value from the data

        Args:
            Key: the key for the cache value

        Returns:
            The cache value for the key
        """
        # get the value of the key is it not none or exists
        if key is None or key not in self.cache_data:
            return None

        # Update use order
        self.use_order.remove(key)
        self.use_order.append(key)

        return self.cache_data[key]
