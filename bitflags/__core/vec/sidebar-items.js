initSidebarItems({"struct":[["Drain","A draining iterator for `Vec<T>`."],["IntoIter","An iterator that moves out of a vector."],["Vec","A growable list type, written `Vec<T>` but pronounced 'vector.'ExamplesThe `vec!` macro is provided to make initialization more convenient:It can also initialize each element of a `Vec<T>` with a given value:Use a `Vec<T>` as an efficient stack:Capacity and reallocationThe capacity of a vector is the amount of space allocated for any future elements that will be added onto the vector. This is not to be confused with the *length* of a vector, which specifies the number of actual elements within the vector. If a vector's length exceeds its capacity, its capacity will automatically be increased, but its elements will have to be reallocated.For example, a vector with capacity 10 and length 0 would be an empty vector with space for 10 more elements. Pushing 10 or fewer elements onto the vector will not change its capacity or cause reallocation to occur. However, if the vector's length is increased to 11, it will have to reallocate, which can be slow. For this reason, it is recommended to use `Vec::with_capacity` whenever possible to specify how big the vector is expected to get.GuaranteesDue to its incredibly fundamental nature, Vec makes a lot of guarantees about its design. This ensures that it's as low-overhead as possible in the general case, and can be correctly manipulated in primitive ways by unsafe code. Note that these guarantees refer to an unqualified `Vec<T>`. If additional type parameters are added (e.g. to support custom allocators), overriding their defaults may change the behavior.Most fundamentally, Vec is and always will be a (pointer, capacity, length) triplet. No more, no less. The order of these fields is completely unspecified, and you should use the appropriate methods to modify these. The pointer will never be null, so this type is null-pointer-optimized.However, the pointer may not actually point to allocated memory. In particular, if you construct a Vec with capacity 0 via `Vec::new()`, `vec![]`, `Vec::with_capacity(0)`, or by calling `shrink_to_fit()` on an empty Vec, it will not allocate memory. Similarly, if you store zero-sized types inside a Vec, it will not allocate space for them. *Note that in this case the Vec may not report a `capacity()` of 0*. Vec will allocate if and only if `mem::size_of::<T>() * capacity() > 0`. In general, Vec's allocation details are subtle enough that it is strongly recommended that you only free memory allocated by a Vec by creating a new Vec and dropping it.If a Vec *has* allocated memory, then the memory it points to is on the heap (as defined by the allocator Rust is configured to use by default), and its pointer points to `len()` initialized elements in order (what you would see if you coerced it to a slice), followed by `capacity() - len()` logically uninitialized elements.Vec will never perform a \"small optimization\" where elements are actually stored on the stack for two reasons:It would make it more difficult for unsafe code to correctly manipulate a Vec. The contents of a Vec wouldn't have a stable address if it were only moved, and it would be more difficult to determine if a Vec had actually allocated memory.It would penalize the general case, incurring an additional branch on every access.Vec will never automatically shrink itself, even if completely empty. This ensures no unnecessary allocations or deallocations occur. Emptying a Vec and then filling it back up to the same `len()` should incur no calls to the allocator. If you wish to free up unused memory, use `shrink_to_fit`.`push` and `insert` will never (re)allocate if the reported capacity is sufficient. `push` and `insert` *will* (re)allocate if `len() == capacity()`. That is, the reported capacity is completely accurate, and can be relied on. It can even be used to manually free the memory allocated by a Vec if desired. Bulk insertion methods *may* reallocate, even when not necessary.Vec does not guarantee any particular growth strategy when reallocating when full, nor when `reserve` is called. The current strategy is basic and it may prove desirable to use a non-constant growth factor. Whatever strategy is used will of course guarantee `O(1)` amortized `push`.`vec![x; n]`, `vec![a, b, c, d]`, and `Vec::with_capacity(n)`, will all produce a Vec with exactly the requested capacity. If `len() == capacity()`, (as is the case for the `vec!` macro), then a `Vec<T>` can be converted to and from a `Box<[T]>` without reallocating or moving the elements.Vec will not specifically overwrite any data that is removed from it, but also won't specifically preserve it. Its uninitialized memory is scratch space that it may use however it wants. It will generally just do whatever is most efficient or otherwise easy to implement. Do not rely on removed data to be erased for security purposes. Even if you drop a Vec, its buffer may simply be reused by another Vec. Even if you zero a Vec's memory first, that may not actually happen because the optimizer does not consider this a side-effect that must be preserved.Vec does not currently guarantee the order in which elements are dropped (the order has changed in the past, and may change again)."]]});