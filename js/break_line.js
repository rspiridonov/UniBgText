(function($){
  $.fn.extend({
    breakLine: function(options) {
      var defaults = {
        tag: 'span'
      }

      options = $.extend(defaults, options);

      return this.each(function() {
        var o = options, width = $(this).width(), temp_id = 'BreakLineTemp', break_line_array,
            temp_block_height, temp_text, break_text;

        var virtual_text_block = '<div id="' + temp_id + '"></div>';

        $('body').append(virtual_text_block);

        $('#' + temp_id).css({
          position: 'absolute',
          visibility: 'hidden',
          width: width - 16
        });

        $(this).find('p').each(function() {
          break_line_array = {};
          temp_block_height = 0;
          temp_text = $(this).text();

          break_text = '<span>';
          $.each(temp_text.split(' '), function(i, value) {
            $('#' + temp_id).append(value + ' ');
            
            if (value) {
              if (temp_block_height != $('#' + temp_id).height()) {
                if (temp_block_height > 0) {
                  break_text += '</span><span>';
                } 
                temp_block_height = $('#' + temp_id).height();
              }
            }
            break_text += value + ' ';
          });
          break_text += '</span>';
          
          
          $(this).html(break_text);
          $('#' + temp_id).text('');
        });
        
        $('#' + temp_id).remove();
        
        $(this).css('display', 'block');
      });
    }
  });
})(jQuery);
