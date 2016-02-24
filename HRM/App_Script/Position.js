function Position() {
    var self = this

    self.init = function () {
        $("#position").dataTable({
            "bDestroy": true,
            "bProcessing": true,
            "oSearch": { "bSmart": false, "bRegex": true },
            "sDom": 't<plf>',
            "sAjaxSource": '/TemplateDocumentCategory/GetAllTemplateDocumentCategory',
            "pagingType": "full_numbers",
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "aoColumns": [
                {
                    mData: "Id",
                    'width': '15px',
                    searchable: false,
                    orderable: false,
                    render: function (data, type, row) {
                        if (type === 'display') {
                            return '<input type="checkbox" class="editor-active">';
                        }
                        return data;
                    },
                    className: "dt-body-center"
                },
                { "mData": "Name" },
                {
                    mData: "Id",
                    className: "dt-body-center",
                    bSortable: false,
                    mRender: function (o) {
                        return "<span style='white-space: nowrap;'><a data-id='" + o + "' class='user_edit btn btn-primary btn-xs'><i class='fa fa-pencil'></i></a><a data-id='" + o + "' class='user_del btn btn-danger btn-xs' data-toggle='modal' data-target='#modalconfirm' data-title='Delete user' data-message='Are you sure you want to delete this user?'><i class='fa fa-times'></i></a></span>";
                    }
                }
            ],
            "order": [1, 'asc'],
            "rowCallback": function (row, data, dataIndex) {
                // Get row ID
                var rowId = data["Id"];
                // If row ID is in the list of selected row IDs
                if ($.inArray(rowId, rows_selected) !== -1) {
                    $(row).find('input[type="checkbox"]').prop('checked', true);
                    $(row).addClass('selected');
                }
            }
        });
    }
}