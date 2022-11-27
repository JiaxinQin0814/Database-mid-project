/*
默认select不可编辑，此插件专门解决
2015-11-05 11:30:40 Joe
*/

(function ($) {
    $.fn.extend({
        'Airman_EditedSelect': function (li, callback) {
            var h = '<div id="Plug_in_Div_1" class="t-input-group">'
            h += '<input id="Plug_in_Text" type="text" class="t-input-search" placeholder="所有" value="" data-value="">'
            h += '</div>'
            h += '<div id="Plug_in_Div_2" class="t-select-in2" style="display:none">'
            h += '<ul>'
            h += li;
            h += '</ul>'
            h += '</div>'
            $(this).html(h);

            $('#Plug_in_Div_1,#Plug_in_Div_2').width($(this).width())

            $('#Plug_in_Caret').click(function () {
                $('#Plug_in_Div_2').toggle()
            });

            $('#Plug_in_Text')
                .focus(function () {
                    $('#Plug_in_Div_2').show()
                })
                .keyup(function () {
                    var search = $(this).val();
                    $('#Plug_in_Div_2 li').each(function () {
                        if ($(this).text().indexOf(search) > -1) {
                            $(this).show()
                        }
                        else {
                            $(this).hide()
                        }
                    })
                });

            $('#Plug_in_Div_2 li')
                .hover(function () {
                    $(this).toggleClass('bg-primary');
                })
                .click(function () {
                    $('#Plug_in_Text').val($(this).text()).attr('data-value', $(this).attr('data-value'));
                    $('#Plug_in_Div_2').hide();
                    callback();
                });
        },
        'Airman_EditedSelect_GetValue': function () {
            return $('#Plug_in_Text').attr('data-value')
        },
        'Airman_EditedSelect_SetValue': function (s) {
            $('#Plug_in_Text').attr('data-value', s)
            $('#Plug_in_Text').val($('#Plug_in_Div_2 li[data-value="' + s + '"]').text());
        }
    })
})(jQuery);