#!/usr/bin/python3
""" Caching project file
"""


from base_caching import BaseCaching


class MRUCache(BaseCaching):
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
        if key is None or item is None:
            return

        # If cache is full, remove the most recently used item (MRU)
        if len(self.cache_data) >= self.MAX_ITEMS:
            mru_key = self.use_order.pop()  # Remove from MRU list
            print(f"DISCARD: {mru_key}")
            del self.cache_data[mru_key]

        # Add the new item
        self.cache_data[key] = item
        self.use_order.append(key)  # Add to MRU list

    def get(self, key):
        """
        Retrieve an item from the cache
        """
        if key is None or key not in self.cache_data:
            return None
        self.use_order.remove(key)
        self.use_order.append(key)

        return self.cache_data[key]
