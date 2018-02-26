
//form, modal options
let options = {
    clients:{},
    prices:{},
    sales:{}, 
    users:{}, 
    requets:{}
}

options.clients = {
  'options': {
    'sort': '-id',
    'create': false,
    'update': false,
    'delete': false
  },
  'filters': {
    'model': {
      'username': '',
      'created_at': ''
    },
    'fields': {
      'city': {
        'label': 'City'
      },
      'status': {
        'label': 'Status',
        'type': 'select',
        'choices':[
          {'text': '未提交', 'value': 0},
          {'text': '审核成功', 'value': 1},
          {'text': '审核失败', 'value': 2}
        ]
      }
      // 'id': {
      //   'label': 'Clientid'
      // },
      // 'location': {
      //   'label': 'Location'
      // }
    },
    'rules': {}
  },
  'columns': [
    {
      'text': 'Id',
      'value': 'id'
    },
    {
      'text': 'Username',
      'align': 'left',
      'value': 'username'
    },
    {
      'text': 'Avatar',
      'align': 'left',
      'value': 'avatar'
    },
    {
      'text': 'Nickname',
      'align': 'left',
      'value': 'nickname'
    }

  ]
}

options.prices = {
  'options': {
    'sort': '-id',
    'create': false,
    'update': false,
    'delete': false
  },
  'filters': {
    'model': {
      'username': '',
      'created_at': ''
    },
    'fields': {
      'city': {
        'label': 'City'
      },
      'status': {
        'label': 'Status',
        'type': 'select',
        'choices':[
          {'text': '未提交', 'value': 0},
          {'text': '审核成功', 'value': 1},
          {'text': '审核失败', 'value': 2}
        ]
      }
      // 'id': {
      //   'label': 'Clientid'
      // },
      // 'location': {
      //   'label': 'Location'
      // }
    },
    'rules': {}
  },
  'columns': [
    {
      'text': 'Adslot Id',
      'align': 'left',
      'value': 'adslot_id'
    },
    {
      'text': 'Ad Type',
      'align': 'center',
      'value': 'ad_type'
    },
    {
      'text': 'Duration',
      'align': 'center',
      'value': 'duration'
    },
    {
      'text': 'Selling Price',
      'align': 'center',
      'value': 'selling_price'
    }

  ]
}

options.requests = {
  'options': {
    'sort': '-id',
    'create': false,
    'update': false,
    'delete': false
  },
  'filters': {
    'model': {
      'username': '',
      'created_at': ''
    },
    'fields': {
      'city': {
        'label': 'City'
      },
      'media_type': {
        'label': 'Media Type'
      },
      'request_id': {
        'label': 'Request Id'
      },
      'location': {
        'label': 'Location'
      }
    },
    'rules': {}
  },
  'columns': [
    {
      'text': 'Request Id',
      'align': 'left',
      'value': 'request_id'
    },
    {
      'text': 'City',
      'align': 'left',
      'value': 'city'
    },
    {
      'text': 'Location',
      'align': 'left',
      'value': 'location'
    },
    {
      'text': 'Material Size',
      'align': 'left',
      'value': 'size'
    },
    {
      'text': 'Media Type',
      'align': 'left',
      'value': 'media_type'
    },
    {
      'text': 'Created At',
      'align': 'left',
      'value': 'created_at'
    },
    {
      'text': 'Material Url',
      'align': 'left',
      'value': 'material_url'
    }

  ]
}

options.sales = {
  'options': {
    'sort': '-id',
    'create': false,
    'update': false,
    'delete': false
  },
  'filters': {
    'model': {
      'username': '',
      'created_at': ''
    },
    'fields': {
      'city': {
        'label': 'City'
      },
      'buying_price': {
        'label': 'Buying Price'
      },
      // 'request_id': {
      //   'label': 'Request Id'
      // },
      'location': {
        'label': 'Location'
      }
    },
    'rules': {}
  },
  'columns': [ 
    {
      'text': 'City',
      'align': 'left',
      'value': 'city'
    },
    {
      'text': 'Location',
      'align': 'left',
      'value': 'location'
    },
    {
      'text': 'Material Size',
      'align': 'left',
      'value': 'size'
    },
    {
      'text': 'Media Type',
      'align': 'left',
      'value': 'type'
    }, 
    {
      'text': 'Selling Price',
      'align': 'left',
      'value': 'selling_price'
    },
    {
      'text': 'Buying Price',
      'align': 'left',
      'value': 'buying_price'
    },
    {
      'text': 'Consumer',
      'align': 'left',
      'value': 'consumer'
    }

  ]
}

options.users = {
  'options': {
    'sort': '-id',
    'create': false,
    'update': false,
    'delete': false
  },
  'filters': {
    'model': {
      'username': '',
      'created_at': ''
    },
    'fields': {
      'user_name': {
        'label': 'Username'
      },
      'phone': {
        'label': 'Phone'
      } 
    },
    'rules': {}
  },
  'form': {
    'model': { 
      user_name: null,
      password: null,
      phone: null,
      email: null
    },
    'fields': {
      'user_name': {
        'label': 'Username',
        'type': 'text',
        'required': true
        
      },
      'password': {
        'label': 'Password',
        'type': 'password',
        'required': true
      },
      'phone': {
        'label': 'Phone'
      },
      'email': {
        'label': 'Email'
      }
    },
    'rules': {
       
    }
  },
  'columns': [
    {
      'text': 'Username',
      'align': 'left',
      'value': 'user_name'
    },
    {
      'text': 'Phone',
      'align': 'left',
      'value': 'phone'
    },
    {
      'text': 'Email',
      'align': 'left',
      'value': 'email'
    },
    {
      'text': 'Created At',
      'align': 'left',
      'value': 'created_at'
    },
    {
      'text': 'Token',
      'align': 'center',
      'value': 'token'
    },
    {
      'text': 'Operate',
      'align': 'center',
      'sortable': false
    }

  ]
}


export default options
