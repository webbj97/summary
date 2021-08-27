data = [
    { id: 1, name: '一级标题-1' },
    { id: 2, name: '一级标题-2' },
    { id: 3, name: '二级标题-1', parent_id: 1 },
    { id: 3, name: '一级标题-3' },
    { id: 3, name: '二级标题-2', parent_id: 2 },
]

needData = [{
        id: 1,
        name: '一级标题-1',
        children: [
            { id: 3, name: '二级标题-1', parent_id: 1 }
        ]
    },
    {
        id: 2,
        name: '一级标题-2',
        children: [
            { id: 5, name: '二级标题-2', parent_id: 2 }
        ]
    },
    { id: 4, name: '一级标题-3' },
]

newList = data.reduce((result, item, _, arr) => {
    if (!item.pid) {
        return [...result, item];
    }
    const parentItem = arr.find(({ id }) => id === item.pid);
    if (parentItem) {
        const { children = [] } = parentItem;
        parentItem.children = [...children, item];
    }
    return result;
}, []);