(function ($) {
  $.fn.extend({
    breakLine: function(options) {
      var defaults = {
        padding: 0,
        tag: 'span'
      };

      options = $.extend(defaults, options);

      return this.each(function() {
        var o = options, width = $(this).width(), open_tag = '<' + o.tag + '>',
            close_tag = '</' + o.tag + '>', temp_id = 'BreakLineTemp', 
            temp_div_selector = '#' + temp_id, 
            virtual_text_block = '<div id="' + temp_id + '"></div>';

        $('body').append(virtual_text_block);

        $(temp_div_selector).css({
          position: 'absolute',
          visibility: 'hidden',
          width: width - o.padding
        });

        $(this).find('p').each(function() {
          var temp_block_height = 0, temp_text = $(this).text(), 
              break_text = open_tag;
              
          $.each(temp_text.split(' '), function(i, value) {
            $(temp_div_selector).append(value + ' ');
            
            if (value) {
              if (temp_block_height !== $(temp_div_selector).height()) {
                if (temp_block_height > 0) {
                  break_text += close_tag + open_tag;
                } 
                temp_block_height = $(temp_div_selector).height();
              }
            }
            break_text += value + ' ';
          });
          break_text += close_tag;
          
          
          $(this).html(break_text);
          $(temp_div_selector).text('');
        });
        
        $(temp_div_selector).remove();
        
        $(this).css('display', 'block');
      });
    }
  });
})(jQuery);
