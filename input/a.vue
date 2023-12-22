<template>
    <Layout   :style="{borderTop: showTabs ? '' : '1px solid #e8eaec'}" id="LayoutABF398098">
      <Layout class="mylayout" :id="LayoutABF797258">
        激发了撒旦解放
        <!--<Row style="height: 40px;line-height: 40px;border-bottom: 1px solid #ccc">
          <h2 style="font-weight: bold;font-size: 16px !important;" id="h2ABF994485">
            <Icon type="logo-tux" id="IconABF451335" />
            快速授权
          </h2>
        </Row>-->
  
      </Layout>
    </Layout>
  
</template>
  
  <script>
    import {tableMixin} from "@/component/tableMixin"
    import {
      getAppModulesAndOperation,
      getGroupTree, getUserByGroup
    } from "@/api/others";
    import {mapActions, mapGetters} from "vuex";
    import AuthRules from "@/api/auth-model/AuthRules";
    import _ from 'lodash';
    import ATable from 'ant-design-vue/lib/table';
    import ATag from 'ant-design-vue/lib/tag';
    import 'ant-design-vue/lib/table/style/css';
    import 'ant-design-vue/lib/tag/style/css';
    import { VueDebounce } from "@/util/assist";
  
    // 定义一个递归函数来搜索匹配的节点
    function searchNodes(node, keywordLower) {
      const matchingChildren = [];
  
      for (const child of node.children || []) {
        const childCopy = { ...child, children: [] };
  
        if (child['displayName'].toString().toLowerCase().includes(keywordLower)) {
          matchingChildren.push(childCopy);
        } else {
          const nestedMatchingChildren = searchNodes(child, keywordLower);
          if (nestedMatchingChildren.length > 0) {
            childCopy.children = nestedMatchingChildren;
            matchingChildren.push(childCopy);
          }
        }
      }
  
      return matchingChildren;
    }
  
    export default {
      name: "auth-brief",
      props: ["store", "root"],
      mixins: [tableMixin],
      components: {
        ATable,
        ATag
      },
      data() {
        const zeroId = '00000000000000000000000000000000';
        return {
          zeroId,
          alwaysTrue: true,
          chosenAuthItem: {},
          rootClassName: "",
          authCardShow: false,
          usersPresent: [],
          chosenUser: [],
          users: [],
          remoteUserArr: [],    // 用户最多显示100条 远程支持
          temRemoteUserArr: [],    // 用户最多显示100条 远程支持
          groups: [],
          remoteLoadingUser: false,
          addRuleModal: false,
          treeRowWrap: {
            display: 'inline-block',
            width: 'calc(100% - 20px)',
            padding: '4px 0',
            borderBottom: '1px solid #ddd',
            lineHeight: '32px',
            margin: '-4px 0'
          },
          usersPresentWrap: {
            display: 'inline-block',
            width: 'calc(100% - 10px)',
            padding: '4px 0',
            borderBottom: '1px solid #ddd',
            lineHeight: '32px',
            fontSize: "16px !important",
          },
          treeData: [],
          keyword: '',
          allDisabled: false,
          userNametoDisaplayName: {},
          showTabs: true,
  
          userGroupColumns: [
            {
              title: this.$t('AuthBrief.data.userGroupColumns[0].title'),
              dataIndex: 'displayName',
              key: 'displayName',
              width: '80%',
              scopedSlots: {customRender: 'displayName'},
            },
            {
              title: this.$t('AuthBrief.data.userGroupColumns[1].title'),
              dataIndex: 'action',
              key: 'action',
              width: '19%',
              scopedSlots: {customRender: 'action'},
            },
          ],
          keywordUserGroup: '',
          keywordUser: '',
          groupPagination: {
            current: 1,
            total: 0,
            showLessItems: true,
          },
          userPagination: {
            current: 1,
            total: 0,
            showLessItems: true,
          },
          currentRow: {},
          userGroups: [],  // 用于展示的处理后用户（组）树数据【】
          selectedGroupKeys: [],
          selectedUserKeys: [],
          selectedGroup: [],
          selectedUser: [],
          hideDefaultSelections: true,
          showUserInGroup: false,
          groupTableLoading: true,
          userTableLoading: true,
          userGroupRowKeys: [],
          // users: [],  // 用于展示的处理后用户树数据【】
        }
      },
      created() {
        this.$store = this.store ? this.store : this.$store;
        this.setAllRules();
        // this.getUserAndGroups();
        this.initData();
        this.allDisabled = sessionStorage.getItem("usernameM") != 'admin';
      },
      mounted() {
        this.showTabs = sessionStorage.getItem('showTabs') == 'hide' ? false : true
      },
      methods: {
        /**
        * @author LiuBo
        * @method
        * @name
        * @private
        * @description 初始化用户用户组表
        * @param {String}
        * @return {String}
        *
        * @example
        */
        async initUserGroupData(){
          let params = {
            fuzzySearch: {
              attributes: this.keywordUserGroup ? ["displayName", "name"] : [],
              keyword: this.keywordUserGroup.trimStart().trimEnd()
            },
            level: 0,
          }
          await this.freshData(0, 10, params);
          let userParams = {
            fuzzySearch: {
              attributes: this.keywordUser ? ["displayName", "name"] : [],
              keyword: this.keywordUser.trimStart().trimEnd()
            },
            level: this.showUserInGroup ? 0 : -1,
          }
          await this.freshUserData(0, 10, this.zeroId, userParams);
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 执行查询用户组接口
         * @param {String}
         */
        async queryData(pageIndex = 0, pageSize = 10, params){
          params.orderCondition = {
            lastModifyTime: "desc",
          };
          let res = await getGroupTree(pageIndex, pageSize, params);
          if(res && res.data.success){
            // this.hideSpin();
            return {
              userGroups: res.data.data.data,
              pageInfo: res.data.data.pageInfo,
            }
          }else{
            return {
              userGroups: [],
              pageInfo: {
                totalCount: 0,
              },
            }
            // this.hideSpin();
          }
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 执行查询用户组接口
         * @param {String}
         */
        async queryUserData(pageIndex = 0, pageSize = 10, oid = '00000000000000000000000000000000', params){
          params.orderCondition = {
            lastModifyTime: "desc",
          };
          let res = await getUserByGroup(pageIndex, pageSize, oid, params);
          if(res && res.data.success){
            // this.hideSpin();
            return {
              userGroups: res.data.data.data,
              pageInfo: res.data.data.pageInfo,
            }
          }else{
            return {
              userGroups: [],
              pageInfo: {
                totalCount: 0,
              },
            }
            // this.hideSpin();
          }
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 装配数据
         * @param {String}
         * @return {String}
         *
         * @example
         */
        async freshData(pageIndex, pageSize, params){
          this.groupTableLoading = true;
          let { userGroups, pageInfo } = await this.queryData(pageIndex, pageSize, params);
          this.userGroups = [];
          for (let id = 0; id < userGroups.length; id++) {
            this.userGroups.push(this.processTreeNode(userGroups[id], {oid: this.zeroId}, 'group'));
          }
          // if (this.currentRow.oid === undefined && this.userGroups.length > 0 && this.userGroups[0].key.startsWith('group')) {
          //   this.currentRow = this.userGroups[0];
          //   this.handleUserGroupClick(this.currentRow)
          // }
          this.groupPagination.total = pageInfo.totalCount;
          this.groupTableLoading = false;
          this.$nextTick(() => {
            this._resizeHeight();
          })
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 装配数据
         * @param {String}
         * @return {String}
         *
         * @example
         */
        async freshUserData(pageIndex, pageSize, oid, params){
          this.userTableLoading = true;
          let { userGroups, pageInfo } = await this.queryUserData(pageIndex, pageSize, oid, params);
          this.users = [];
          this.userPagination.total = pageInfo.totalCount;
          this.users = userGroups.map(x => {
            return {
              key: x.oid,
              ...x
            }
          });
          this.userTableLoading = false;
          this.$nextTick(() => {
            this._resizeHeight();
          })
        },
  
        /**
        * @author LiuBo
        * @method
        * @name
        * @private
        * @description 获取全部用户,清除currentRow
        */
        freshAllUser(){
          this.currentRow = {};
          this.showUserInGroup = false;
          this.handleSearchUser();
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 先处理成适应表格展示的数据，再传给表格数据源即this.userGroups（否则ATable会报错，如duplicate key）
         * @param {String}
         * @return {String}
         *
         * @example
         */
        processTreeNode(node, parent, role){
          let curNode = {...node};
          // 根据现有前端逻辑，用户displayName非undefined，故藉此判断递归终点（是用户而非用户组）
          curNode.childrenCount > 0 ? curNode.children = [] : void 0;
          curNode.key = `${role}_${curNode.oid}_${parent.oid}`;
          // curNode.level = level;
          let groupNodes = [];
          for (let idg = 0; curNode.childrenGroups && idg < curNode.childrenGroups.length; idg++) {
            groupNodes.push(this.processTreeNode(curNode.childrenGroups[idg], curNode, 'group'));
          }
          for (let idg = 0; idg < groupNodes.length; idg++) curNode.children.push(groupNodes[idg]);
          // if (curNode.childrenCount > 0) curNode.children = []
          return curNode;
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 用户组分页
         * @param {Object} 分页信息
         */
        async handlePageChange(pagination){
          this.userGroupRowKeys = [];
          let params = {
            fuzzySearch: {
              attributes: this.keywordUserGroup ? ["displayName", "name"] : [],
              keyword: this.keywordUserGroup.trimStart().trimEnd()
            },
            level: this.keywordUserGroup ? -1 : 0,
          }
          await this.freshData(pagination.current - 1, 10, params);
          this.groupPagination.current = pagination.current;
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 用户分页
         * @param {Object} 分页信息
         */
        async handleUserPageChange(pagination){
          let params = {
            fuzzySearch: {
              attributes: this.keywordUser ? ["displayName", "name"] : [],
              keyword: this.keywordUser.trimStart().trimEnd()
            },
            level: this.showUserInGroup ? 0 : -1,
          }
          await this.freshUserData(pagination.current - 1, 10, this.currentRow.oid, params);
          this.userPagination.current = pagination.current;
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 用户组展开查询
         * @param {Object<expanded>}
         * @param {Object<record>}
         */
        async handleSearchGroupChildren(expanded, record){
          //已经展开不执行，已有子组不执行，已有关键词查询不执行
          if(!expanded) {
            this.removeExpendedGroupKeys(record.key);
            return;
          }
          this.addExpendedGroupKeys(record.key);
          if(record.children.length > 0) return;
          if(this.keywordUserGroup) return;
          let params = {
            fuzzySearch: {
              attributes: [],
              keyword: ''
            },
            level: 0,
            rootGroupName: record.name
          }
          //给子组增加当前分页，确保每点击一次“更多”能请求到之后分页的子组数据
          record.current = 1;
          let children = [];
          let { userGroups } = await this.queryData(record.current - 1, 10, params);
          for (let id = 0; id < userGroups.length; id++) {
            children.push(this.processTreeNode(userGroups[id], record, 'group'));
          }
          record.children = children;
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 输入关键字查询用户组
         * @param {String}
         * @return {String}
         *
         * @example
         */
        _handleSearchGroup: VueDebounce("handleSearchGroup", 100),
  
        handleSearchGroup(){
          let params = {
            fuzzySearch: {
              attributes: this.keywordUserGroup ? ["displayName", "name"] : [],
              keyword: this.keywordUserGroup.trimStart().trimEnd()
            },
            level: this.keywordUserGroup ? -1 : 0,
          }
          this.groupPagination.current = 1;
          this.freshData(this.groupPagination.current - 1, 10, params);
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 输入关键字查询用户
         * @param {String}
         * @return {String}
         *
         * @example
         */
        _handleSearchUser: VueDebounce("handleSearchUser", 100),
  
        handleSearchUser(){
          let params = {
            fuzzySearch: {
              attributes: this.keywordUser ? ["displayName", "name"] : [],
              keyword: this.keywordUser.trimStart().trimEnd()
            },
            level: this.showUserInGroup ? 0 : -1,
          }
          this.userPagination.current = 1;
          this.freshUserData(this.userPagination.current - 1, 10, this.currentRow.oid, params);
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 点击组查询本组下用户
         */
        async handleUserGroupClick(row){
          this.userTableLoading = true;
          this.keywordUser = '';
          this.currentRow = row;
          let params = {
            fuzzySearch: {
              attributes: this.keywordUser ? ["displayName", "name"] : [],
              keyword: this.keywordUser.trimStart().trimEnd()
            },
            level: this.showUserInGroup ? 0 : -1,
          }
          let { userGroups, pageInfo } = await this.queryUserData(0, 10, row.oid, params);
          this.users = [];
          this.userPagination.total = pageInfo.totalCount;
          this.users = userGroups.map(x => {
            return {
              key: x.oid,
              ...x
            }
          });
          this.userTableLoading = false;
          this.$nextTick(() => {
            this._resizeHeight();
          })
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 展开子组，每次增加10条
         * @param {Object}
         */
        async childMore(record){
          let params = {
            fuzzySearch: {
              attributes: [],
              keyword: ''
            },
            level: 0,
            rootGroupName: record.name
          }
          //给子组增加当前分页，确保每点击一次“更多”能请求到之后分页的子组数据
          record.current = record.current ? record.current + 1 : 1;
          let children = [];
          let { userGroups } = await this.queryData(record.current - 1, 10, params);
          for (let id = 0; id < userGroups.length; id++) {
            children.push(this.processTreeNode(userGroups[id], record, 'group'));
          }
          record.children = record.children.concat(children);
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 切换只看本组
         */
        async changeShowUserInGroup(){
          let params = {
            fuzzySearch: {
              attributes: this.keywordUser ? ["displayName", "name"] : [],
              keyword: this.keywordUser.trimStart().trimEnd()
            },
            level: this.showUserInGroup ? 0 : -1,
          }
          await this.freshUserData(0, 10, this.currentRow.oid, params);
          this.userPagination.current = 0;
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 增加所选组keys
         * @param {String}
         */
        addToSelectedGroupKeys(key) {
          this.selectedGroupKeys.push(key);
          this.selectedGroupKeys = [...new Set(this.selectedGroupKeys)];
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 增加所选组
         * @param {String}
         */
        addToSelectedGroup(key, group) {
          let index = this.selectedGroup.findIndex(x => x.key === key);
          if(index < 0){
            this.selectedGroup.push(group)
          }
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 删除所选组tag
         * @example
         */
        removeGroupTag(key){
          this.removeFromSelectedGroupKeys(key);
          this.removeFromSelectedGroup(key)
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 删除所选组keys
         * @example
         */
        removeFromSelectedGroupKeys(key) {
          let s = new Set(this.selectedGroupKeys);
          s.delete(key);
          this.selectedGroupKeys = [...s];
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 删除所选组
         * @example
         */
        removeFromSelectedGroup(key) {
          let index = this.selectedGroup.findIndex(x => x.key === key);
          if(index >= 0){
            this.selectedGroup.splice(index, 1);
          }
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 增加所选用户keys
         * @param {String}
         */
        addToSelectedUserKeys(key) {
          this.selectedUserKeys.push(key);
          this.selectedUserKeys = [...new Set(this.selectedUserKeys)];
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 增加所选用户
         * @param {String}
         */
        addToSelectedUser(key, group) {
          let index = this.selectedUser.findIndex(x => x.key === key);
          if(index < 0){
            this.selectedUser.push(group)
          }
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 删除所选用户tag
         * @example
         */
        removeUserTag(key){
          this.removeFromSelectedUserKeys(key);
          this.removeFromSelectedUser(key)
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 删除所选用户keys
         * @example
         */
        removeFromSelectedUserKeys(key) {
          let s = new Set(this.selectedUserKeys);
          s.delete(key);
          this.selectedUserKeys = [...s];
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 删除所选用户
         * @example
         */
        removeFromSelectedUser(key) {
          let index = this.selectedUser.findIndex(x => x.key === key);
          if(index >= 0){
            this.selectedUser.splice(index, 1);
          }
        },
  
        // /**
        //  * @author LiuBo
        //  * @method
        //  * @name
        //  * @private
        //  * @description
        //  * @param {String}
        //  * @return {String}
        //  *
        //  * @example
        //  */
        // generateSelectedGroup(){
        //   let group = [];
        //   this.selectedGroupKeys.forEach(x => {
        //
        //   })
        // },
  
        /**
        * @author LiuBo
        * @method
        * @name
        * @private
        * @description 点击组行
        * @param {String}
        */
        userGroupCustomRow(record){
          return {
            on: {
              click: event => {
                this.handleUserGroupClick(record)      // 点击行
              }
            },
          };
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 增加展开用户组keys
         * @param {String}
         */
        addExpendedGroupKeys(key) {
          this.userGroupRowKeys.push(key);
          this.userGroupRowKeys = [...new Set(this.userGroupRowKeys)];
        },
  
        /**
         * @author LiuBo
         * @method
         * @name
         * @private
         * @description 删除展开用户组keys
         * @example
         */
        removeExpendedGroupKeys(key) {
          let s = new Set(this.userGroupRowKeys);
          s.delete(key);
          this.userGroupRowKeys = [...s];
        },
  
        _resizeHeight(pageHeight = 176, topHeight = 0) {
          let antUserTableList = this.$refs.userTable.$el.querySelectorAll('.ant-table-body')
          if(antUserTableList.length){
            antUserTableList.forEach((item) => {
              // 大小屏底部边距看起来不统一
              topHeight = item.parentNode.getBoundingClientRect().top
              item.style.overflow = 'auto'
              let hasEmpty = item.nextSibling
              if(hasEmpty !== null){
                item.style.display = 'none'
                hasEmpty.style.height = window.innerHeight - pageHeight - topHeight + 'px'
              }else{
                item.style.display = 'block'
                item.style.height = window.innerHeight - pageHeight - topHeight + 'px'
              }
            })
          }
          let antGroupTableList = this.$refs.userGroupTable.$el.querySelectorAll('.ant-table-body')
          if(antGroupTableList.length){
            antGroupTableList.forEach((item) => {
              // 大小屏底部边距看起来不统一
              topHeight = item.parentNode.getBoundingClientRect().top
              item.style.overflow = 'auto'
              let hasEmpty = item.nextSibling
              if(hasEmpty !== null){
                item.style.display = 'none'
                hasEmpty.style.height = window.innerHeight - pageHeight - topHeight + 'px'
              }else{
                item.style.display = 'block'
                item.style.height = window.innerHeight - pageHeight - topHeight + 'px'
              }
            })
          }
        },
  
        step(i){
          return "deleteUserRuleButton"+i;
        },
  
        globalRefresh() {
          this.setAllRules();
          this.userGroupRowKeys = [];
          // this.getUserAndGroups();
          this.initData(true);
          this.groupPagination.current = 1;
          this.userPagination.current = 1;
          this.initUserGroupData();
        },
        addRootClassName(target, rootClassName) {
          let _self = this;
          let children = target.children;
          for (let i = 0; i < children.length; ++i) {
            let child = children[i];
            child.rootClassName = rootClassName;
            if (child.children && child.children.length > 0) {
              _self.addRootClassName(child, rootClassName);
            }
          }
        },
        changeRemote(v) {
          if(v == '') {
            setTimeout(() => {
                this.remoteUserArr = this.temRemoteUserArr;
            }, 200)
          }
        },
        remoteUser(query) {
          if (query !== '') {
            this.remoteLoadingUser = true;
            let self = this;
            setTimeout(() => {
                self.remoteLoadingUser = false;
                self.remoteUserArr = self.users.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 200);
          } else {
              this.remoteUserArr = this.temRemoteUserArr;
          }
        },
        async initData(rFlag) {
          this.$Spin.show();
          let appIndex = {};  // order in all roots
          let moduleIndex = {};  // order in app's children
          let moduleData = [];  // 计算一级菜单（模块）所需原始数据
          let operationIndex = {};  // order in module's children
          let authToOperation = {};  // operation's authority -> operation (只存了二级菜单)
          let operationData = [];  // 计算二、三级菜单（操作）所需原始数据
          let promises = [];
          let withDefaultModule = true
          let res = await getAppModulesAndOperation(withDefaultModule)
          this.treeData = res.data.data.map(row => {
            return {
              ...row,
              displayName: row.title,
              render: (h, {root, node, data}) => {
                return h('span', {
                  style: this.treeRowWrap
                }, [
                  h('span', [
                    h('Icon', {
                      props: {
                        type: 'logo-dropbox'
                      },
                      style: {
                        marginRight: '8px'
                      }
                    }),
                    h('Tooltip',
                      {
                        props: { placement: 'bottom', maxWidth: 300, transfer: true}
                      }, [
                        h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } },data.title),
                        h('span', {
                            style: {
                              display: 'inline-block',
                              width: '150px',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              lineHeight: '1',
                              verticalAlign: 'middle'
                            }
                          }, data.title
                        )
                      ])
                  ]),
                  h('span', {
                    style: {
                      display: 'inline-block',
                      float: 'right',
                      marginRight: '8px'
                    }
                  }, [
                    h('Button', {
                      props: Object.assign({}, this.buttonProps, {
                        icon: 'md-add',
                        type: 'primary',
                        size: 'small'
                      }),
                      attrs: {
                        id: `createRuleButton${node.nodeKey}`
                      },
                      on: {
                        click: () => {
                          this.showModal(data)
                        }
                      }
                    }),
                    h('Button', {
                      props: Object.assign({}, this.buttonProps, {
                        icon: 'ios-eye',
                        size: 'small'
                      }),
                      attrs: {
                        id: `viewRuleButton${node.nodeKey}`
                      },
                      style: {
                        marginLeft: '8px'
                      },
                      on: {
                        click: () => {
                          this.showAuthCard(data)
                        }
                      }
                    })
                  ])
                ]);
              }
            };
          })
          for (let i = 0; i < this.treeData.length; ++i) {
            let moduleDataTmp = this.treeData[i].children;
            if (this.treeData[i].appName == 'modeler' && moduleDataTmp.length > 0) {
              moduleDataTmp = moduleDataTmp.filter(x => {
                return x.className != 'ModelPackage'
              })
            }
            this.treeData[i].children = moduleDataTmp.length > 0? moduleDataTmp : undefined;
            for (let j = 0; moduleDataTmp && j < moduleDataTmp.length; j++) {
              let operationDataTmp = moduleDataTmp[j].children;
              if (
                this.treeData[i].appName == 'modeler' && operationDataTmp.length > 0) {
                operationDataTmp = operationDataTmp.filter(x => {
                  return x.conditionExpre != 'addin:AuthBlock'
                    && x.conditionExpre != 'addin:AttrAccessRule'
                    && x.conditionExpre != 'addin:ObjAccessRule'
                    && x.conditionExpre != 'addin:OnlineManagement'
                    && x.conditionExpre != 'addin:ModelPackageManage'
                    && x.conditionExpre != 'addin:CodeAssembly'
                })
              }
              // for (let k = 0; operationDataTmp && k < operationDataTmp.length; k++) {
              //   if (operationDataTmp[k].action == 'folder') {
              //     for (let p = 0;operationDataTmp[k].children&& p < operationDataTmp[k].children.length; p++) {
              //       operationDataTmp[k].children[p].children = undefined;
              //       operationDataTmp[k].children[p].rootModuleName = operationDataTmp[k].moduleName;
              //     }
              //     operationData = operationData.concat(operationDataTmp[k].children)
              //   }
              //   else {
              //     operationDataTmp[k].children = undefined;
              //   }
              // }
              moduleDataTmp[j].children = operationDataTmp.length > 0 ? operationDataTmp: undefined;
              operationData = operationData.concat(operationDataTmp)
              // console.log('operationData', j, this.operationData, operationData)
            }
            moduleData = moduleData.concat(moduleDataTmp)
          }
          this.filteredTreeData = this.treeData.slice(0);
          console.log('filteredTreeData',this.filteredTreeData)
          if(rFlag == true) {
            this.authCardShow = false;
          }
          this.$Spin.hide();
        },
        ...mapActions('authRules', ['setAllRules']),
        async showModal(authItem) {
          this.chosenAuthItem = authItem;
          this.authCardShow = true;
          this.addRuleModal = true;
          this.showUserInGroup = false;
          this.currentRow = {};
          this.keywordUserGroup = '';
          this.keywordUser = '';
          this.groupPagination.current = 1;
          this.userPagination.current = 1;
          this.selectedGroup = [];
          this.selectedGroupKeys = [];
          this.selectedUser = [];
          this.selectedUserKeys = [];
          this.userGroupRowKeys = [];
          // this.$refs["selectUser"].clearSingleSelect();
          this.remoteUserArr = this.temRemoteUserArr;
          this.usersPresent = this.getRulesByItem(authItem.authority || authItem.className || `APP_${authItem.appName}`);
          // let tempNameList = this.users.map(user => {
          //   return user.name;
          // }).concat(this.groups.map(group => {
          //   return group.name;
          // }));
          // this.usersPresent = this.usersPresent.filter(rule => {
          //   return tempNameList.indexOf(rule.participant) > -1;
          // })
          await this.initData();
          await this.initUserGroupData();
          this._resizeHeight();
        },
        async showAuthCard(authItem) {
          //todo:: change users
          await this.setAllRules();
          this.chosenAuthItem = authItem;
          this.authCardShow = true;
          this.usersPresent = this.getRulesByItem(authItem.authority || authItem.className || `APP_${authItem.appName}`);
          // let tempNameList = this.users.map(user => {
          //   return user.name;
          // }).concat(this.groups.map(group => {
          //   return group.name;
          // }));
          // this.usersPresent = this.usersPresent.filter(rule => {
          //   return tempNameList.indexOf(rule.participant) > -1;
          // })
        },
        closeAuthCard() {
          this.authCardShow = false;
        },
        renderContent(h, {root, node, data}) {
          return h('span', {
            style: this.treeRowWrap
          }, [
            h('span', [
              h('Icon', {
                props: {
                  type: 'logo-tux'
                },
                style: {
                  marginRight: '8px'
                }
              }),
              h('Tooltip',
                {
                  props: { placement: 'bottom', maxWidth: 300, transfer: true},
                }, [
                  h('span', { slot: 'content', style: { whiteSpace: 'normal', wordBreak: 'break-all' } },data.displayName),
                  h('span', {
                  style: {
                    display: 'inline-block',
                    width: '150px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    lineHeight: '1',
                    verticalAlign: 'middle'
                  }
                }, data.displayName
                )
              ])
            ]),
            h('span', {
              style: {
                display: 'inline-block',
                float: 'right',
                marginRight: '8px'
              }
            }, [
              h('Button', {
                props: Object.assign({}, this.buttonProps, {
                  icon: 'md-add',
                  type: 'primary',
                  size: 'small'
                }),
                attrs: {
                  id: `createRuleButton${node.nodeKey}`
                },
                on: {
                  click: () => {
                    this.showModal(data)
                  }
                }
              }),
              h('Button', {
                props: Object.assign({}, this.buttonProps, {
                  icon: 'ios-eye',
                  size: 'small'
                }),
                attrs: {
                  id: `viewRuleButton${node.nodeKey}`
                },
                style: {
                  marginLeft: '8px'
                },
                on: {
                  click: () => {
                    this.showAuthCard(data)
                  }
                }
              })
            ])
          ]);
        },
        /*renderWithNoButton(h, {root, node, data}) {
          return <div
            style={[this.treeRowWrap]}>
            <icon type={"logo-tux"} style="margin-right:8px;"/>
            {data.displayName}&&
            {data.className}
          </div>;
        },*/
        // renderCardTitle(h, {root, node, data}) {
        //
        //   return <h3 style="display:inline-block">
        //     <icon type="logo-tux"/>
        //     {data.displayName}
        //   </h3>
        //
        // },
        // getUserAndGroups() {
        //   AuthRules.getAllGroups().then(res => {
        //     this.groups = res.data;
        //     res.data.forEach((val, index) => {
        //       this.userNametoDisaplayName[val.name] = val.displayName;
        //     })
        //   });
        //   AuthRules.getAllUsers().then(res => {
        //     res.data.forEach((val, index) => {
        //       let eachU = {
        //         ...val,
        //         value: val.name,
        //         label: `${val.name}(${val.displayName})`
        //       };
        //       this.userNametoDisaplayName[val.name] = val.displayName;
        //       this.users.push(eachU);
        //       if(index < 100) {
        //         this.remoteUserArr.push(eachU);
        //         this.temRemoteUserArr.push(eachU);
        //       }
        //     });
        //     this.users = _.uniqBy(this.users, 'oid');
        //     this.remoteUserArr = _.uniqBy(this.remoteUserArr, 'oid');
        //     this.temRemoteUserArr = _.uniqBy(this.temRemoteUserArr, 'oid');
        //   });
        // },
        removeRule(oid, index) {
          let _self = this;
          AuthRules.deleteRule(oid).then(res => {
            _self.usersPresent.splice(index, 1);
            // _self.getUserAndGroups();
            _self.setAllRules();
            _self.initUserGroupData();
            _self.$Message.success(this.$t('AuthBrief.methods.removeRule'));
          });
          // .catch(err => _self.$Message.info('网络错误'));
        },
        resetUserGroup(status) {
          if(status) {
            this.remoteUserArr = this.temRemoteUserArr;
          }
        },
        createRule() {
          let _self = this;
          let rule = [];
          // rule = this.chosenUser.map(item => {
          //   return {
          //     "attrName": "",
          //     "authority": _self.chosenAuthItem.authority || _self.chosenAuthItem.className || `APP_${_self.chosenAuthItem.appName}`,
          //     "className": _self.chosenAuthItem.rootModuleName ||_self.chosenAuthItem.moduleName || _self.chosenAuthItem.className || `APP_${_self.chosenAuthItem.appName}`,
          //     "conditionId": "AlwaysTrue",
          //     "isInheritant": true,
          //     "level": 0,
          //     "note": "",
          //     "oid": "",
          //     "participant": item
          //   }
          // });
          rule = this.selectedGroup.concat(this.selectedUser).map(item => {
            return {
              "attrName": "",
              "authority": _self.chosenAuthItem.authority || _self.chosenAuthItem.className || `APP_${_self.chosenAuthItem.appName}`,
              "className": _self.chosenAuthItem.rootModuleName ||_self.chosenAuthItem.moduleName || _self.chosenAuthItem.className || `APP_${_self.chosenAuthItem.appName}`,
              "conditionId": "AlwaysTrue",
              "isInheritant": true,
              "level": 0,
              "note": "",
              "oid": "",
              "participant": item.name
            }
          });
          console.log(rule)
          if (rule && rule.length > 0) {
            AuthRules.createRules(rule).then(async res => {
              if (res.data.length > 0) {
                // _self.usersPresent.unshift(...res.data);
                // _self.getUserAndGroups();
                await _self.setAllRules();
                _self.usersPresent = _self.getRulesByItem(_self.chosenAuthItem.authority || _self.chosenAuthItem.className || `APP_${_self.chosenAuthItem.appName}`);
                this.addRuleModal = false;
                _self.$Message.success(this.$t('AuthBrief.methods.createRule'));
              } else {
                this.addRuleModal = false;
                _self.$Message.info(this.$t('AuthBrief.methods.createRule'));
              }
            }).catch(err => {
              // _self.$Message.error('网络错误');
              this.addRuleModal = false;
            });
  
          }
          else {
            // this.addRuleModal = false;
            _self.$Message.info(this.$t('AuthBrief.methods.createRule'));
          }
        }
      },
      computed: {
        ...mapGetters('authRules', ['getRulesByItem']),
        oidToGroup() {
          let res = {};
          for (let id in this.groups) {
            res[this.groups[id].name] = {...this.groups[id]};
          }
          return res;
        },
        filteredTreeData: {
          // 在get方法中调用递归函数
          get() {
            const keywordLower = this.keyword.toLowerCase().trimStart().trimEnd();
            const tempdata = [];
  
            for (const app of this.treeData) {
              const appCopy = { ...app, children: [] };
              if (app['title'] && app['title'].toString().toLowerCase().includes(keywordLower)) {
                tempdata.push(app);
              } else {
                const matchingChildren = searchNodes(app, keywordLower);
                if (matchingChildren.length > 0) {
                  appCopy.children = matchingChildren;
                  tempdata.push(appCopy);
                }
              }
            }
  
            return tempdata;
          },
  
          set() {
          }
  
        },
  
        userGroupRowSelection() {
          return {
            type: 'checkbox',
            selectedRowKeys: this.selectedGroupKeys,
            onSelect: (record, selected, selectedRows, event) => {
              if(selected){
                //选中
                this.addToSelectedGroupKeys(record.key);
                this.addToSelectedGroup(record.key, record);
              }else{
                //反选
                this.removeFromSelectedGroupKeys(record.key);
                this.removeFromSelectedGroup(record.key);
              }
              this.handleUserGroupClick(record)
              // this.chosenUser.push(selectedRows)
              // 此时this.selectedGroupKeys为上次选中的所有key，selectedRowKeys为新的选中的所有key
              // 计算新旧选中key列表之差，然后不再使用selectedRowKeys
              // let addedKeys = selectedRowKeys.filter(x => { return this.selectedGroupKeys.indexOf(x) < 0 });
              // let removedKeys = this.selectedGroupKeys.filter(x => { return selectedRowKeys.indexOf(x) < 0 });
              // // 更新this.selectedGroupKeys
              // for (let i=0;i < addedKeys.length; i ++) this.addToSelectedGroupKeys(addedKeys[i]);
              // for (let i=0;i < removedKeys.length; i ++) this.removeFromSelectedGroupKeys(removedKeys[i]);
              // this.generateSelectedGroup();
              // 此时this.selectedUserGroupKeys已完成更新
              // setTimeout(this.showIndeterminateSelects, 0);  // 更新需要设为半选状态的节点列表，并显示为半选状态
              // this.selectedUserIds = [];
              // this.selectedGroupIds = [];
              // for (let id =0; id <this.selectedUserGroupKeys.length; id ++) {
              //   if (this.selectedUserGroupKeys[id].startsWith('user_')) {
              //     let userId = this.selectedUserGroupKeys[id].split('_')[1];
              //     this.selectedUserIds.push(userId);
              //   } else {
              //     let groupId = this.selectedUserGroupKeys[id].split('_')[1];
              //     this.selectedGroupIds.push(groupId);
              //   }
              // }
              // this.selectedUserIds = [...new Set(this.selectedUserIds)];
              // this.selectedGroupIds = [...new Set(this.selectedGroupIds)];
              // this.currentRow = selectedRows[0];
              // this.handleUserGroupClick(this.currentRow)
              // // this.updateRulesForExpandedClasses();
            },
            getCheckboxProps: record => {
              // console.log(record)
              return {
                props: {
                  // defaultChecked: this.currentRow && this.currentRow.key == record.key
                }
              }
            }
          }
        },
  
        userRowSelection() {
          return {
            type: 'checkbox',
            selectedRowKeys: this.selectedUserKeys,
            onSelect: (record, selected, selectedRows, event) => {
              if(selected){
                //选中
                this.addToSelectedUserKeys(record.key);
                this.addToSelectedUser(record.key, record);
              }else{
                //反选
                this.removeFromSelectedUserKeys(record.key);
                this.removeFromSelectedUser(record.key);
              }
            },
            getCheckboxProps: record => {
              // console.log(record)
              return {
                props: {
                  // defaultChecked: this.currentRow && this.currentRow.key == record.key
                }
              }
            }
          }
        },
      }
    }
  </script>
  
  <style scoped>
  /*#ABuserTable >>> .ant-table-thead .ant-checkbox-input{*/
  /*  display: none;*/
  /*}*/
  /*#ABuserTable >>> .ant-table-thead .ant-checkbox-inner{*/
  /*   display: none;*/
  /*}*/
  /*#ABuserGroupTable >>> .ant-table-thead .ant-checkbox-input{*/
  /*  display: none;*/
  /*}*/
  /*#ABuserGroupTable >>> .ant-table-thead .ant-checkbox-inner{*/
  /*  display: none;*/
  /*}*/
  /*#ABuserGroupTable >>> .ant-table-body{*/
  /*  display: block!important;*/
  /*}*/
  /*#ABuserTable >>> .ant-table-body{*/
  /*  display: block!important;*/
  /*}*/
  .users-group-tag{
    display: block;
    box-sizing: border-box;
    outline: 0;
    min-height: 32px;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    position: relative;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdee2;
    padding: 0px 24px 0px 4px;
  }
    .old_user_option{
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .mylayout {
      width: 100%;
      padding: 0 20px;
      background: #fff;
      min-height: 600px;
      margin: 0 auto;
    }
    .info-wrap {
      position: fixed;
      z-index: 1;
      right: 30px;
      top: 80px;
      display: inline-block;
      width: 40%;
      max-width: 600px;
      min-width: 266px;
      min-height: 300px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 1px 6px #ccc;
      background: #fff;
      padding: 0;
      /* height: 690px;
      overflow-y: auto; */
    }
    .tree-wrap {
      position: relative;
      z-index: 2;
      display: inline-block;
      max-width: 600px;
      min-width: 266px;
      width: 40%;
      padding: 4px;
      margin-top: 16px;
      border: 1px solid #ccc;
      box-shadow: 0 1px 6px #ccc;
      border-radius: 4px;
      background: #fff;
      /* height: 690px; */
      /* overflow-y: auto; */
    }
    @media screen and (max-width: 1400px) {
      .tree-wrap {
        /* height: 420px; */
      }
      .info-wrap{
        /* height: 420px; */
      }
    }
    @media screen and (min-width: 1401px) and (max-width: 1699px) {
      .tree-wrap {
        /* height: 550px; */
      }
      .info-wrap{
        /* height: 550px; */
      }
    }
    .tree-wrap:hover, .info-wrap:hover {
      box-shadow: 0 1px 6px #aaa;
    }
    .tree-row-wrap {
      display: inline-block;
      width: 85%;
      padding: 4px 0;
      border-bottom: 1px solid #ddd;
      line-height: 32px;
      margin: -4px 0
    }
    label {
      font-size: 15px !important;
      font-weight: 600;
      margin-left: 4px;
    }
    .auth-card-enter-active, .auth-card-leave-active {
      transition: all .5s ease;
    }
    .auth-card-enter, .auth-card-leave-to {
      transform: translateX(600px);
      opacity: 0;
    }
    .star_label .ivu-form-item-label:before {
    content: '*';
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 14px;
    color: #ed4014;
  }
  </style>
  